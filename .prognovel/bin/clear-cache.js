const { fail } = require("./_errors");

exports.command = "clear-cache";
exports.aliases = ["cc", "clear"];

// exports.builder = {
//   banana: {
//     default: "cool",
//   },
//   batman: {
//     default: "sad",
//   },
// };

exports.handler = function (argv) {
  try {
    require("fs").rmSync(".cache", { recursive: true });
    console.log(`
  🗑️ clearing cache...

  `);
  } catch (error) {
    // console.log(error);
    // fail();
  }
};

exports.describe =
  "Clear cache of your ProgNovel project. Useful if you recently upgrade your ProgNovel CLI or encountering problems.";
