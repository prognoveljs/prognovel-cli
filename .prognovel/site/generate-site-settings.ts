import fs from "fs";
import yaml from "js-yaml";
import { contributionRoles, revSharePerChapter } from "../novels/contributors";
import { errorSiteSettingsNotFound } from "../utils/build/fail";
import { ensurePublishDirectoryExist } from "../utils/check-valid-book-folder";
import { publishFiles, siteFiles } from "../_files";
import { getSiteContributors } from "./site-contributors-data";
import { join } from "path";
import { generateSiteImages, zipDirectory } from "../utils/generate-static-assets";

export function generateSiteSettings() {
  let settings: any;
  try {
    settings = yaml.load(fs.readFileSync(siteFiles().settings, "utf-8"));
  } catch (_) {
    errorSiteSettingsNotFound();
  }

  if (!settings.cors) settings.cors = "*";
  settings.contribution_roles = settings["rev_share_contribution_per_chapter"]
    ? Object.keys(settings["rev_share_contribution_per_chapter"])
    : [];
  settings.global_payment_pointers = getSiteContributors();

  if (!settings.limit_global_payment_pointers_share_in_novel) {
    console.error("no limit setting for global payment pointers found");
    process.exit();
  }

  ensurePublishDirectoryExist();
  fs.writeFileSync(publishFiles().siteMetadata, JSON.stringify(settings, null, 4));
  fs.writeFileSync(join(publishFiles().folder, "_redirects"), `/ /sitemetadata.json 200`, "utf-8");
  generateSiteImages();
  const out = ".publish/components.zip";
  try {
    zipDirectory("components", out);
  } catch (error) {
    console.log("error zipping components!");
    console.log(error);
  }

  contributionRoles.set(settings.contribution_roles);
  revSharePerChapter.set(settings["rev_share_contribution_per_chapter"]);

  return settings;
}
