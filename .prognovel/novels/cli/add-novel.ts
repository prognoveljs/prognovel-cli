import { mkdirSync, readFileSync, copyFileSync, writeFileSync } from "fs";
import { load, dump } from "js-yaml";
import { siteFiles } from "../../_files";
import { failBuild } from "../../utils/build";
import { checkIDString } from "../../utils/check-valid-book-folder";
import { errorSiteSettingsNotFound } from "../../utils/build/fail";

export function addNovel(novel: string) {
  if (!checkIDString(novel)) {
    failBuild(`Invalid input. Novel ID must not contain spaces and special character.
Use dash "-" to separate words instead of space.`);
  }
  let settings;
  try {
    settings = load(readFileSync(siteFiles().settings, "utf-8"));
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
  writeFileSync(`novels/${novel}/contents/volume-1/chapter-1.md`, chapterTemplate, "utf-8");
  copyFileSync(process.env.MAIN_PATH + "/assets/banner.jpeg", `novels/${novel}/banner.jpeg`);
  copyFileSync(process.env.MAIN_PATH + "/assets/cover.png", `novels/${novel}/cover.png`);

  Object.keys(novelConfigFiles).forEach((file) => {
    writeFileSync(`novels/${novel}/` + file, novelConfigFiles[file], "utf-8");
  });

  writeFileSync(siteFiles().settings, dump(settings), "utf-8");

  console.log(`
  🎉 you have created a new novel for your site.
  Go check it out in folder "novels/${novel}"
  
  Proceed in configuring novel settings in "info.yml" and credit
  your editors/proofreaders/contributors in "contributors.yml". 
  Change the book cover and banner while you're at it!
  
`);

  process.exit();
}

const novelConfigFiles = {
  "synopsis.md": `This is an example of novel synopsis. This will appear in novel page later.
  
You can use markdown format here. Happy writing!`,
  "info.yml": `title: New Novel
author: Hipster Author
contact: example@email.com
demographic: seinen
genre: fantasy, drama, comedy
tags: demo novel, translated novel, web novel
# have Discord group you want readers to join?
# uncomment below by remove # and set the value to your group ID
#discord_group_id: 676722421512xxxxxxxxxxx
  `,
  "contributors.yml": `# You can remove comment lines starting with #
# Standard value after the contributor nickname is a string indicates
# Web Monetization payment pointer to the contributor. If you need to insert more data
# you can create an object for it that ultimately has "payment" children value.
# 
# If you include email to as children value, ProgNovel will pull Gravatar
# avatar image and profile based on that email and show them in ProgNovel's
# Revenue Share section in every novel page.
#
# Unlike contributors for entire site, you don't have to set rate for
# novel contributors because ProgNovel will calculate rate for them based
# on how many they are being credited in the novel chapters frontmatter.

# Author
AuthorName:
  payment: $ilp.uphold.com/LJmbPn7WD4JB # ILP address - FreeCodeCamp
  email: example@email.com

# Editor
EditorName: $ilp.uphold.com/D7BwPKMQzBiD # ILP address - Internet Archive

# Proofreader
MyProofreader: $ilp.uphold.com/rKe8mMbUGkBm # ILP address - Web Foundation
Zoom: $ilp.uphold.com/edR8erBDbRyq # ILP address - Creative Commons
Kabooom: $ilp.uphold.com/JWP2Um9RFi9a # ILP address - Artist Rescue Trust
Wowee: $ilp.uphold.com/QkG86UgXzKq8 # ILP address - Defold Foundation
  `,
};

const chapterTemplate = `---
title: A Chapter Title
monetized: false
author: AuthorName
editor: EditorName
---

Bla bla bla bla the story goes here bla bla bla...`;
