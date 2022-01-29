#!/usr/bin/env node
require("dotenv").config();
require("source-map-support").install();

process.env.MAIN_PATH = require.main.path;

if (process.argv.slice(-1)[0].endsWith("index.js")) {
  require("./build").run();
  return;
}

require("yargs")
  .scriptName("prognovel")
  .usage(`Usage: prognovel <command> [option (if any)]`)
  .command(require("./build"))
  .command(require("./publish"))
  .command(require("./new"))
  .command(require("./novel"))
  .command(require("./gui"))
  .command(require("./clear-cache"))
  .command(require("./fix-typo"))
  .command(require("./check")).argv;
