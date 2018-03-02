import { Gardening, getPlugins as getGardeningPlugins } from "@rsi-plugins/gardening";
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
    const plugins = getGardeningPlugins();

    await server.run(DEFAULTRUNOPTIONS);
    for (const plugin of plugins) {
      server.addService(new Gardening());
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
