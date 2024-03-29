exports.command = "new";
// exports.aliases = ["build", "b"];
const { failBuild } = require("../.dist/fail");
const { existsSync, mkdirSync, writeFileSync, copyFileSync } = require("fs");
const {
  siteSettingsContent,
  siteContributorsContent,
  siteFilesContent,
  components,
  news,
} = require("./_new-files");
const { join, resolve } = require("path");

exports.builder = {
  publish: {
    default: false,
  },
};

exports.handler = async function ({ _ }) {
  if (_.length > 1)
    failBuild(
      `To create a new project, use "prognovel new [your-project-title]".
  No spaces allowed for your project title.`,
      "parameter too long",
    );

  if (existsSync("site-settings.yml") || existsSync("site-settings.yaml")) {
    failBuild(
      "Settings files for ProgNovel project found - make sure to create a project on a blank folder.",
      "project already exists",
    );
  }

  const { folderTitle } = await questions();
  const basePath = folderTitle ? folderTitle + "/" : "";

  if (folderTitle) mkdirSync(folderTitle);

  try {
    mkdirSync(basePath + "novels");
  } catch (error) {}
  try {
    const componentsFolder = join(basePath, "components");
    if (!existsSync(componentsFolder)) mkdirSync(componentsFolder);
    for (const key in components) {
      const folder = join(componentsFolder, key);
      if (!existsSync(folder)) mkdirSync(folder);
      Object.keys(components[key]).forEach((file) => {
        writeFileSync(join(folder, file), components[key][file], "utf-8");
      });
    }
  } catch (error) {}
  try {
    const newsFolder = join(basePath, "news");
    if (!existsSync(newsFolder)) mkdirSync(newsFolder);
    for (const file in news) {
      writeFileSync(join(newsFolder, file), news[file], "utf-8");
    }
  } catch (error) {}
  Object.keys(siteFilesContent).forEach((file) => {
    writeFileSync(basePath + file, siteFilesContent[file], "utf-8");
  });

  copyFileSync(process.env.MAIN_PATH + "/assets/favicon.png", basePath + "favicon.png");
  copyFileSync(process.env.MAIN_PATH + "/assets/logo.png", basePath + "logo.png");
  console.log(`
  🎉 you have created a new ProgNovel site.
  
  Proceed in configuring settings in "site-settings.yml" and credit
  your staffs in "site-contributors.yml". Change the logo image while you're at it!
  
  Once you are done, you can create a new novel folder by running
  "prognovel novel add some-novel-id".
  
`);
  process.exit();
};

async function questions() {
  const { stdin, stdout } = require("process");
  const rl = require("readline-promise").default.createInterface({
    input: stdin,
    output: stdout,
    terminal: true,
  });

  let newFolder = false;
  let folderTitle = "";

  while (true) {
    const answer = await rl.questionAsync("Create project in a new folder? (N/y): ");
    if (!answer || answer.toLowerCase() === "n") {
      newFolder = false;
      break;
    } else if (answer.toLowerCase() === "y") {
      newFolder = true;
      break;
    }
  }

  while (newFolder && !folderTitle) {
    folderTitle = await rl.questionAsync("Insert folder name for your project: ");
  }

  return {
    folderTitle,
  };
}

exports.describe = "Create a blank ProgNovel project.";
