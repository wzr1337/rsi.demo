import { Gardening, getPlugins as getGardeningPlugins } from "@rsi-plugins/gardening";
import { getPlugins as getMediaPlugins } from "@rsi-plugins/media";
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
      server.addService(Gardening.getInstance());
    }

    /**
     * load plugins and add them to the server
     */
    const mediaPlugins = getMediaPlugins();

    for (const plugin of mediaPlugins) {
      server.addService(plugin.getInstance());
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
