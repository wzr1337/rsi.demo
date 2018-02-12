# RSI Demo application

This project implements the Volkswagen Infotainment Web Interface (viwi/RSI) as published under [https://www.w3.org/Submission/2016/01/](https://www.w3.org/Submission/2016/01/). It uses the base modules

* [@RSI/server](https://github.com/wzr1337/rsi.server)
* [@RSI/medialibrary](https://github.com/wzr1337/rsi-plugins.medialibrary)


[![Build Status](https://travis-ci.org/wzr1337/rsi.demo.svg?branch=master)](https://travis-ci.org/wzr1337/rsi.demo)

## Build the software
As this project uses TypeScript, you need to complie it into regular JavaScript first using 

```sh
$ npm run build
```

## Run it

To run the server, use

```sh
$ http_proxy='' npm run start
```

**Note** Please ensure that proxy settings are set appropriately for your environment.

after you `npm run build` it


### Available command line arguments

| long parameter | short parameter | type   | description                                    |
|----------------|-----------------|--------|------------------------------------------------|
| --port         | -p              | number | the port number to listen on                   |
| --base         | -b              | string | the base url                                   |
| --verbosity    | -v              | string | the winston log level to plot into the console |