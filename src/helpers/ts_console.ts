// tslint:disable-next-line:no-var-requires
const TSConsoleReporter = require("jasmine-ts-console-reporter");

jasmine.getEnv().clearReporters(); // Clear default console reporter
jasmine.getEnv().addReporter(new TSConsoleReporter());
// jasmine.getEnv().addReporter(new ConsoleReporter());
// jasmine.getEnv().addReporter(new ExitCodeReporter());
