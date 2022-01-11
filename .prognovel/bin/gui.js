const { fail } = require("./_errors");

exports.command = "gui";
exports.aliases = ["ui"];

exports.handler = function (argv) {
  try {
    require("../.dist/main").initializeGUIServer();
  } catch (error) {
    console.log(error);
    fail();
  }
};

exports.describe = "Create local server for ProgNovel GUI.";
