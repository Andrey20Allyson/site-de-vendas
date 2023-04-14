import React, { ReactNode } from "react";

export interface ReactNodeParseOptions {
  replaceString: string;
  Component: React.ComponentType<React.PropsWithChildren>;
}

export interface ReactNodeParserConfig {
  parsers?: ReactNodeParseOptions[];
  locked?: boolean;
}

export class ReactNodeParser {
  private _parsers: ReactNodeParseOptions[];
  private _locked: boolean;

  constructor(config?: ReactNodeParserConfig) {
    this._parsers = [];

    this._locked = config?.locked ?? false;

    if (config?.parsers) this.use(...config.parsers);
  }

  get locked() {
    return this._locked;
  }

  parse(data: string) {
    return ReactNodeParser.parse(data, this._parsers);
  }

  use(...parsers: ReactNodeParseOptions[]) {
    if (this._locked) throw Error('this parser is locked!');

    for (const parser of parsers) {
      this._parsers.push(parser);
    }

    this._parsers.sort((a, b) => b.replaceString.length - a.replaceString.length);
  }

  lock() {
    this._locked = true;
  }

  static Italic(props: React.PropsWithChildren) {
    return <em>{props.children}</em>
  }

  static Strong(props: React.PropsWithChildren) {
    return <strong>{props.children}</strong>
  }

  static strongParser(): ReactNodeParseOptions {
    return {
      Component: ReactNodeParser.Strong,
      replaceString: '*',
    }
  }

  static italicParser(): ReactNodeParseOptions {
    return {
      Component: ReactNodeParser.Italic,
      replaceString: '_'
    }
  }

  static parse(data: string, parsers: ReactNodeParseOptions[]) {
    const nodes: ReactNode[] = [];
  
    let buff = '';
    let key = 0;
  
    for (let i = 0; i < data.length; i++) {
      let parserFound: null | ReactNodeParseOptions = null;
  
      for (let j = 0; j < parsers.length; j++) {
        const parser = parsers[j];
        const { replaceString } = parser;
  
        let match = true;
  
        for (let k = 0; k < replaceString.length; k++) {
          if (data[i + k] !== replaceString[k]) {
            match = false;
            break;
          }
        }
  
        if (!match) continue;
  
        parserFound = parser;
      }
  
      if (!parserFound) {
        buff += data[i];
        continue;
      }
  
      const { Component, replaceString } = parserFound;
  
      nodes.push(buff);
      buff = '';
  
      const expStart = i + replaceString.length;
  
      const expEnd = data.indexOf(replaceString, expStart);
  
      if (expEnd === -1) {
        buff = data.slice(i);
        break;
      }
  
      const expText = data.slice(expStart, expEnd);
  
      nodes.push(<Component key={key++}>{this.parse(expText, parsers)}</Component>);
  
      i = expEnd + replaceString.length - 1;
    }
  
    if (buff.length) {
      nodes.push(buff);
    }
  
    return nodes;
  }
}

export const { italicParser, strongParser, parse, Italic, Strong } = ReactNodeParser;
export const defaultParser = new ReactNodeParser();

defaultParser.use(
  strongParser(),
  italicParser(),
);

defaultParser.lock();

export default defaultParser;