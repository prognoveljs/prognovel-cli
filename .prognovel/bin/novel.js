exports.command = "novel";
// exports.aliases = ["build", "b"];
const { failBuild } = require("../.dist/fail");

exports.builder = {
  publish: {
    default: false,
  },
};

const COMMANDS = ["add", "remove"];

exports.handler = async function (argv) {
  const { _ } = argv;
  const cmd = _[1];
  const novel = _[2];
  if (!COMMANDS.includes(cmd))
    failBuild(
      `Invalid command for prognovel novel ... are:
  
  ${COMMANDS.join("\n  ")}
  
  For example, use "prognovel novel add my-new-novel" to create a new novel folder.
  Note that you can change "my-new-novel" above with identifier of your own novels,
  as long as it doesn't contain spaces (use dash "-" instead of spaces)`,
      "invalid command",
    );
  if (_.length > 3)
    failBuild(
      `To add a new novel, use "prognovel novel add [your-novel-title]". 
  No spaces allowed for your project title. Use dash "-" to as separator
  space instead.
  `,
      "parameter too long",
    );

  switch (cmd) {
    case "add":
      try {
        require("../.dist/main").addNovel(novel);
      } catch (error) {
        console.log(error);
      }
      break;
    case "remove":
      console.log(
        "Under development. If you wish to remove a novel from your project, manually delete its folder and then remove it under `novels` in site-settings.yml",
      );
      break;
    default:
      break;
  }
};

exports.describe = "Create a blank ProgNovel project.";
