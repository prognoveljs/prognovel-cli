# 💻 ProgNovel CLI

![maintained?](https://img.shields.io/badge/maintained%3F-yes-green.svg)
![last commit](https://img.shields.io/github/last-commit/prognoveljs/prognovel-cli/develop)
![commit](https://img.shields.io/github/commit-activity/m/prognoveljs/prognovel-cli/develop)
![version](https://img.shields.io/github/package-json/v/prognoveljs/prognovel-cli)

## 👇 ProgNovel CLI installation

1. Install ProgNovel CLI to your computer. You need a stable release of [Node.js](https://nodejs.org/) installed first, then in command prompt, run `npm install @prognovel/cli -g`.
2. In an empty folder, open command prompt and run `prognovel new`.
3. You need to have a way to connect to Cloudflare Workers servers by setting the value of environment secrets. If you manage your ProgNovel project folder locally in a computer, you can configure environment secrets via `.env` file in your root project folder created in step (2) - (`.env` file might be hidden in your Explorer app); if you host this project folder on Github repo, you can consult [this page](https://docs.github.com/en/actions/security-guides/encrypted-secrets) to create your environment secrets.<br /><br />
Set the value of `CF_ACCOUNT_ID` and `CF_NAMESPACE_ID` the same ID from what you configure in `wrangler.toml` when you set up your ProgNovel Workers. `CF_API_TOKEN` is something you need to create from Cloudflare Workers dashboard - consult [this page](https://developers.cloudflare.com/workers/cli-wrangler/authentication#generate-tokens)] to create one.<br /><br />
As for `SITE_URL`, is the URL you'll have to host your ProgNovel site, which you can set later on. Finally `DISCORD_WEBHOOK_URL` is something you get from your your Discord server.
4. Replace logo and favicon for the site. Proceed to configure settings as you'd like in `site-settings.yml` and list your website staffs and contributors in `site-contributors.yml` (learn more how to set up site contibutors [here](https://demo.prognovel.com/help/monetization/2-setup-web-monetization-website-staff)).
5. You need at least one novel to publish your own ProgNovel app. Again in root folder of your project (where `site-settings.yml` is), run `prognovel novel add some-novel-id` (use alphabets and numbers with dash `-` to replace space for your novel ID). Configure novel settings as you'd like.
6. Once your content is ready, run `prognovel publish`. (PRO tips: if you create Discord bot and get Webhook for it, you can connect it in your `site-settings.yml` and your bot will automatically announce new content whenever you successfully publish your content)

After your contents already published in your backend, you are ready to install your frontend.

## 🤔 What to know

### General rules for ProgNovel app

(WIP)

### Rules for novels

This rules mainly applies for configs and naming convention inside folder `novels/**` of your ProgNovel project folder.

1. Using CLI for project name or novel id should be in lower case and can't have `space` in them. Use dash `-` as separator between words instead.
2. After you create a novel folder inside your project with `prognovel novel add ...`, you can create a new chapter file in markdown with prefix `chapter-` (just like previously, use dash `-` instead of space). For example, if you have content for chapter 1, create `chapter-1.md` inside `novels/{your-novel-folder}/contents/{current-volume-or-book}/chapter-1.md`.
3. You notice chapters of your novels are inside volume. You can create folders of volume inside `novels/{your-novel-folder}/contents` folder, to separate chapters into several books. Like chapter, volume is formatted to have dash `-` instead of space, though you are free to decide their prefix.
4. ProgNovel will index chapters order with Alphanum sort. This is a bit  similar to how Windows Explorer sort names of files. Therefore as a rule of thumb, you can sort the index of your chapters just by having the name sort active in your Explorer - for example `chapter-1.md`, `chapter-2.md`, `chapter-3.md` will sorted with ascending order inside ProgNovel's table of content.
5. You can split a chapter or simply having an extra by having it formatted with an extra dash after the chapter index. For example, if you have an extra chapter after Chapter 3 and want to index this extra chapter as Chapter 3.5, you can format the name of chapter markdown as `chapter-3-5.md`. This is also valid when you split chapters into several part with the format, for example, `chapter-5-1.md` then havving to proceed to `chapter-5-2.md`, so on. 
6. To give a title inside a chapter, you have to create frontmatter part inside the markdown. Chapter frontmatter can handle `title` attribute, as well as `monetization` to enable Web Monetization chapter lock and also list contributors for that particular chapter. For example:

```md
---
title: The Youth from Badril Village
monetization: true
author: Radhy
editor: Zoom, MyEditor
---

Bla bla bla this is the content of chapter...
```

7. Also inside chapters' frontmatters, you can specify how authors and other novel staffs/contributors are being paid with Web Monetization revenue share. As you notice in example in step (6), in the frontmatter beside `title` and `monetization` attributes we got `author` and `editor`. For every person credited with roles, they'll have more shares in Web Monetization revenue share, accumulates for every chapters they are part in. The kind of roles you can assign in chapters' frontmatters and their rate per chapter is configured in `site-settings.yml` in your root project folder, under the variable `rev_share_contribution_per_chapter` (which you can add or remove roles as well as their rates). For ProgNovel to recognize novel authors/staffs/contributors in chapters' frontmatters, you need to specify their names and payment pointers in `contributors.yml` in your novel folder (note that this is different from `site-contributors.yml` in your root project folder).

8. (Optional) for more information about how revenue share for novel authors and contributors works, read [https://demo.prognovel.com/help/monetization/3-setup-web-monetization-novel-staff](https://demo.prognovel.com/help/monetization/3-setup-web-monetization-novel-staff).