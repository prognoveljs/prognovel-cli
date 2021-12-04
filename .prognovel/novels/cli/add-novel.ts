import { mkdirSync, readFileSync, copyFileSync, writeFileSync } from "fs";
import { errorSiteSettingsNotFound } from "../../.dist/fail";
import { load, dump } from "js-yaml";
import { siteFiles } from "../../_files";
import { failBuild } from "../../utils/build";
import { checkIDString } from "../../utils/check-valid-book-folder";

export function addNovel(novel: string) {
  if (!checkIDString(novel)) {
    failBuild(`Invalid input. Novel ID must not contain spaces and special character.
Use dash "-" to separate words instead of space.`);
  }
  let settings;
  try {
    settings = load(readFileSync(siteFiles().settings), "utf-8");
  } catch (_) {
    errorSiteSettingsNotFound();
  }

  try {
    settings.novels = [...(settings.novels || []), novel];
  } catch (error) {
    failBuild(`Invalid "novels" setting. Check site-settings.yml and make sure
"novels" value is an array in YAML format. 

More information:
https://www.w3schools.io/file/yaml-arrays/`);
  }

  mkdirSync(`novels/${novel}/contents/volume-1`, { recursive: true });
  copyFileSync(require.main.path + "/assets/banner.jpeg", `novels/${novel}/banner.jpeg`);
  copyFileSync(require.main.path + "/assets/cover.png", `novels/${novel}/cover.png`);

  writeFileSync(siteFiles().settings, JSON.stringify(dump(settings)), "utf-8");
  process.exit();
}
