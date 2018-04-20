import { Gardening, getPlugins as getGardeningPlugins} from "@rsi-plugins/gardening";
import { getPlugins as getMediaPlugins} from "@rsi-plugins/media";
import { Cdn } from "@rsi/cdn";
import { IRsiLoggerInstance, RsiLogger } from "@rsi/core";
import { RsiServer } from "@rsi/server";
import { ServiceRegistry } from "@rsi/serviceregistry";
import * as commandLineArgs from "command-line-args";
import { readFileSync } from "fs";
import * as path from "path";

const DEFAULTRUNOPTIONS = {
  base: "",
  port: 3000,
  serviceRegistry: "http://localhost:3600",
  verbosity: "silly"
};

const logger: IRsiLoggerInstance = RsiLogger.getInstance().getLogger("demo", "silly");

/**
 * parse command line options
 */
const optionDefinitions = [
  { name: "verbosity", alias: "v", type: String },
  { name: "port", alias: "p", type: Number },
  { name: "base", alias: "b", type: String },
  { name: "serviceRegistry", alias: "s", type: String }
];
const cla = commandLineArgs(optionDefinitions);
/** end parse command line argunments */

const serviceRegistry: ServiceRegistry = new ServiceRegistry(3600);
serviceRegistry.init();

const opts = Object.assign(DEFAULTRUNOPTIONS, cla);

const server: RsiServer = new RsiServer();
server.run(opts).then((data) => {
  logger.info("Server running:", opts);
});

/**
 * load plugins and add them to the server
 */
const mediaPlugins = getMediaPlugins();

for (const plugin of mediaPlugins) {
  const svc = plugin.getInstance();
  server.addService(svc);
}

/**
 * load plugins and add them to the server
 */
const gardeningPlugins = getGardeningPlugins();
for (const plugin of gardeningPlugins) {
  server.addService(plugin.getInstance());
}

// cdn demo
logger.info(Cdn.getInstance().register("images", "curlies.jpg", (image: string): Buffer => {
  return readFileSync(path.join(__dirname, "../curlies.png"));
}));
