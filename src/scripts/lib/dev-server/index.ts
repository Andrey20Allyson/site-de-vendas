import express, { Express, Response, Request, RequestHandler, IRouterHandler } from 'express';
import { RouteParameters } from 'express-serve-static-core';
import EventEmitter from 'events';
import { getFirstExternalIP } from './network';
import { createTimeoutError } from '../util/promises';
import path from 'path';

export class Client extends EventEmitter {
  static readonly RESPONSE_HEADERS = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };

  private static createdClients = 0;

  private static getClientID() {
    return this.createdClients++;
  }

  readonly id: number;
  private _req: Request;
  private _res: Response;

  constructor(req: Request, res: Response) {
    super();

    this.id = Client.getClientID();

    this._req = req;
    this._res = res;

    this._res.writeHead(200, Client.RESPONSE_HEADERS);

    this._req.on('close', () => this.emit('close'))

    this.send(this.id.toString());
  }

  on(eventName: 'close', listener: () => void): this;
  on(eventName: string | symbol, listener: (args: any[]) => any): this {
    return super.on(eventName, listener);
  }

  emit(eventName: 'close'): boolean;
  emit(eventName: string | symbol, ...args: any[]): boolean {
    return super.emit(eventName, ...args);
  }

  send(data: string) {
    if (this._res.writable) {
      this._res.write(`data: ${data}\n\n`);
    }
  }
}

export type PrivateStartReturn = {
  host: string;
  port: number;
}

export type StartOptions = {
  port?: number;
  stdout?: (message: string) => void;
  stderr?: (message: string) => void;
  onerror?: (error: Error) => void;
}

export type ServerConfig = {
  root?: string;
}

export enum StartExitCodes {
  SUCCESS,
  PARCIAL_SUCCESS,
  FAILURE,
}

export class DevServer {
  static createAndStart(config?: ServerConfig) {
    const {
      root = 'dev',
    } = config ?? {};
    
    const server = new this();

    server.addHost('localhost');

    server._app.use(express.static(root));
    server._app.use(DevServer.notFound(root));

    const externalIP = getFirstExternalIP();

    if (externalIP) server.addHost(externalIP);

    server.defaultStart();

    return server;
  }

  private _app: Express;
  private _clients: Client[];
  private _hosts: Set<string>;

  constructor() {
    this._app = express();
    this._clients = [];
    this._hosts = new Set();

    this._app.get('/events', this.eventsRouteHandler.bind(this));
  }

  get app() {
    return this._app;
  }

  static notFound(root: string = '.') {
    return (req: Request, res: Response) => res.status(404).sendFile(path.join(process.cwd(), root, '404.html'))
  }

  addHost(hostname: string) {
    this._hosts.add(hostname);
  }

  removeHost(hostname: string) {
    this._hosts.delete(hostname);
  }

  private eventsRouteHandler(req: Request, res: Response) {
    const client = new Client(req, res);

    this._clients.push(client);

    client.on('close', () => this.removeClient(client.id));
  }

  private removeClient(clientID: number) {
    this._clients = this._clients.filter(client => client.id !== clientID);
  }

  async defaultStart() {
    const code = await this.start({
      stdout: console.log,
      stderr: console.warn,
      onerror: console.error,
    });

    if (code === StartExitCodes.FAILURE) {
      process.exit(1);
    }
  }

  async start(options?: StartOptions) {
    const {
      onerror,
      stderr,
      stdout,
      port = 3000,
    } = options ?? {};

    if (this._hosts.size === 0) {
      onerror?.(new Error('Can\'t initialize because hosts is empity! try use "addHost(hostname: string)".'));
      return StartExitCodes.FAILURE;
    }

    let initializations = Array
      .from(this._hosts.keys())
      .map(host => this._start(host, port));

    let initsWithSuccess = 0;

    stdout?.('Initializing development server');

    stdout?.('   [ Listening ]');

    for (let initialization of initializations) {
      try {
        const { host, port } = await initialization;

        initsWithSuccess++;

        stdout?.(`>> http://${host}:${port}/`);
      } catch (err) {
        if (err instanceof Error) {
          onerror?.(err);
        } else {
          onerror?.(new Error(String(err)));
        }
      }
    }

    stdout?.('');

    if (initsWithSuccess === initializations.length) {
      stdout?.('(√) Initialized all hosts with success!');
      return StartExitCodes.SUCCESS;
    } else if (initsWithSuccess > 0) {
      stderr?.(`(!) Initialized ${initsWithSuccess} of ${initializations.length} hosts!`);
      return StartExitCodes.PARCIAL_SUCCESS;
    } else {
      stderr?.('(x) Failed on initialization!');
      return StartExitCodes.FAILURE;
    }
  }

  private _start(host: string, port: number, timeout = 3000) {
    return Promise.race([
      new Promise<PrivateStartReturn>((res, rej) => this._listen(host, port, res, rej)),
      createTimeoutError(timeout),
    ]);
  }

  private _listen(host: string, port: number, success?: (value: PrivateStartReturn) => void, failure?: (reason?: any) => void) {
    this._app.listen(port, host, () => success?.({ host, port }))
      .on('error', err => {
        if (err.message.includes('EADDRINUSE') && port < 2 ** 16) {
          this._listen(host, port + 1, success, failure);
        } else {
          failure?.(err);
        }
      });
  }

  reloadClients() {
    for (const client of this._clients) {
      client.send('reload');
    }
  }
}