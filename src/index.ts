import { PluginLoader, RsiServer, ServiceRegistry } from '@rsi/server';
import { join } from 'path';
import { Medialibrary } from '@rsi-plugins/medialibrary';

const DEFAULTRUNOPTIONS = {
    port: 3000,
    verbosity: 'silly',
    base: '',
    serviceRegistry: 'http://localhost:3600'
};

/**
 * parse command line options
 */
const commandLineArgs = require('command-line-args')
const optionDefinitions = [
    { name: 'verbosity', alias: 'v', type: String },
    { name: 'port', alias: 'p', type: Number },
    { name: 'base', alias: 'b', type: String },
    { name: 'include-addons', alias: 'a', type: String },
    { name: 'exclude-plugins', alias: 'e', type: String },
    { name: 'serviceRegistry', alias: 's', type: String }
]
const cla = commandLineArgs(optionDefinitions);
const options = Object.assign(DEFAULTRUNOPTIONS, cla);
const url = require('url');
const u = url.parse(options.serviceRegistry);
const serviceRegistryPort: number = u.port;

/** end parse command line argunments */


if (options.serviceRegistry || options.serviceRegistry !== '') {
    const serviceRegistry: ServiceRegistry = new ServiceRegistry(serviceRegistryPort);
    serviceRegistry.init();
}

const server: RsiServer = new RsiServer();
server.run(Object.assign(DEFAULTRUNOPTIONS, cla));

/*
const plugins: PluginLoader = new PluginLoader(server);
plugins.loadPlugin(join(__dirname, '..', 'node_modules', '@rsi-plugins', 'medialibrary', 'dist'));
*/

const medialibrary: Medialibrary = new Medialibrary();
server.addService(medialibrary);


