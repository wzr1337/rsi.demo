import { Gardening, getPlugins as getGardeningPlugins} from "@rsi-plugins/gardening";
import { getPlugins as getMediaPlugins} from "@rsi-plugins/media";
import { RsiServer } from "@rsi/server";
import { ServiceRegistry } from "@rsi/serviceregistry";
import * as commandLineArgs from "command-line-args";

const DEFAULTRUNOPTIONS = {
  base: "",
  port: 3000,
  serviceRegistry: "http://localhost:3600",
  verbosity: "silly"
};

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

const server: RsiServer = new RsiServer();
server.run(Object.assign(DEFAULTRUNOPTIONS, cla));

/**
 * load plugins and add them to the server
 */
const mediaPlugins = getMediaPlugins();

for (const plugin of mediaPlugins) {
  server.addService(new plugin());
}

/**
 * load plugins and add them to the server
 */
const gardeningPlugins = getGardeningPlugins();

for (const plugin of gardeningPlugins) {
  server.addService(new plugin());
}
