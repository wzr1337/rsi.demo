import * as media from "@rsi-plugins/media";
import { IRunOptions, RsiServer } from "@rsi/server";
import { join } from "path";

const DEFAULTRUNOPTIONS: IRunOptions = {
  base: "",
  port: 3000,
  verbosity: "error"
};

process.env.HTTP_PROXY = "";

let server: RsiServer;

export function startServer(): Promise<IRunOptions> {
  return new Promise(async (resolve, reject) => {
    server = new RsiServer();
    /**
     * load plugins and add them to the server
     */
    const mediaPlugins = media.getPlugins();

    await server.run(DEFAULTRUNOPTIONS);
    for (const plugin of mediaPlugins) {
      server.addService(new plugin());
    }
    resolve(DEFAULTRUNOPTIONS);
  });
}

export function stopServer(): Promise<{}> {
  return new Promise(async (resolve, reject) => {
    await server.stop();
    resolve();
  });
}
