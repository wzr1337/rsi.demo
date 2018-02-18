import { RsiServer } from '@rsi/server';
import * as media from '@rsi-plugins/media';

const DEFAULTRUNOPTIONS = {
  port: 3000,
  verbosity: 'silly',
  base: ''
};

/**
* parse command line options
*/
const commandLineArgs = require('command-line-args')
const optionDefinitions = [
  { name: 'verbosity', alias: 'v', type: String },
  { name: 'port', alias: 'p', type: Number },
  { name: 'base', alias: 'b', type: String },
  { name: 'serviceRegistry', alias: 's', type: String }
]
const cla = commandLineArgs(optionDefinitions);
/** end parse command line argunments */

const server: RsiServer = new RsiServer();
server.run(Object.assign(DEFAULTRUNOPTIONS, cla));

/**
 * load plugins and add them to the server
 */
const mediaPlugins = media.getPlugins();

for (let index = 0; index < mediaPlugins.length; index++) {
  const plugin = mediaPlugins[index];
  server.addService(new plugin());
}