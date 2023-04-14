import { startDevBundle } from "./lib/builder";
import { DevServer } from "./lib/dev-server";
import { watch } from "./lib/util/watch-docs";

const server = DevServer.createAndStart();

async function watchAndUpdateServer() {
  await startDevBundle();

  for await (const info of watch('dev/')) {
    server.reloadClients();
  }
}

watchAndUpdateServer();