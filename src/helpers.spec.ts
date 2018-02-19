import { join } from 'path';
import { RsiServer } from '@rsi/server';
import * as media from '@rsi-plugins/media';
import { RunOptions } from '@rsi/server/dist/types';

const DEFAULTRUNOPTIONS:RunOptions = {
  port: 3000,
  base: '',
  verbosity: "error"
};

process.env.HTTP_PROXY = '';

let server:RsiServer;

export function startServer():Promise<RunOptions> {
  return new Promise(async (resolve, reject) => {
    server = new RsiServer();
    /**
     * load plugins and add them to the server
     */
    const mediaPlugins = media.getPlugins();

    await server.run(DEFAULTRUNOPTIONS);
    for (let index = 0; index < mediaPlugins.length; index++) {
      const plugin = mediaPlugins[index];
      server.addService(new plugin());
    }
    resolve(DEFAULTRUNOPTIONS);
  });
};

export function stopServer():Promise<{}> {
  return new Promise(async (resolve, reject) => {
    await server.stop();
    resolve();
  })
};