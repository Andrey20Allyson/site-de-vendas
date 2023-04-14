import { DevServer } from "./lib/dev-server";

const server = DevServer.createAndStart({
  root: 'docs'
});
