# 💻 ProgNolve CLI

![maintained?](https://img.shields.io/badge/maintained%3F-yes-green.svg)
![last commit](https://img.shields.io/github/last-commit/prognoveljs/prognovel-cli/develop)
![commit](https://img.shields.io/github/commit-activity/m/prognoveljs/prognovel-cli/develop)
![version](https://img.shields.io/github/package-json/v/prognoveljs/prognovel-cli)

## ProgNovel CLI installation

1. Install ProgNovel CLI to your computer. You need a stable release of [Node.js](https://nodejs.org/) installed first, then in command prompt, run `npm install @prognovel/cli -g`.
2. In an empty folder, open command prompt and run `prognovel new`. Or use `prognovel new some-prognovel-project` to create a project within that folder instead.
3. Replace logo and configure settings as you'd like in `site-settings.yml` and list your website staffs and contributors in `site-contributors.yml`.
3. You need at least one novel to publish your own ProgNovel app. Again in root folder of your project (where `site-settings.yml` is), run `prognovel novel add some-novel-id` (use alphabets and numbers with dash `-` to replace space for your novel ID). Configure novel settings as you'd like.
4. Once your content is ready, run `prognovel publish`. (PRO tips: if you create Discord bot and get Webhook for it, you can connect it in your `site-settings.yml` and your bot will automatically announce new content whenever you successfully publish your content)

After your contents already published in your backend, you are ready to install your frontend.

## What to know

### Rules for novels

1. Using CLI for project name or novel id should be in lower case and can't have `space` in them. Use dash `-` as separator between words instead.
2. After you create a novel folder inside your project with `prognovel novel add ...`, you can create a new chapter file in markdown with prefix `chapter-` (just like previously, use dash `-` instead of space). For example, if you have content for chapter 1, create `chapter-1.md` inside `novels/{your-novel-folder}/contents/{current-volume-or-book}/chapter-1.md`.
3. You notice chapters of your novels are inside volume. You can create folders of volume inside `novels/{your-novel-folder}/contents` folder, to separate chapters into several books. Like chapter, volume is formatted to have dash `-` instead of space, though you are free to decide their prefix.
4. ProgNovel will index chapters order with Alphanum sort. This is a bit  similar to how Windows Explorer sort names of files. Therefore as a rule of thumb, you can sort the index of your chapters just by having the name sort active in your Explorer - for example `chapter-1.md`, `chapter-2.md`, `chapter-3.md` will sorted with ascending order inside ProgNovel's table of content.
5. You can split a chapter or simply having an extra by having it formatted with an extra dash after the chapter index. For example, if you have an extra chapter after Chapter 3 and want to index this extra chapter as Chapter 3.5, you can format the name of chapter markdown as `chapter-3-5.md`. This is also valid when you split chapters into several part with the format, for example, `chapter-5-1.md` then havving to proceed to `chapter-5-2.md`, so on. 
6. To give a title inside a chapter, you have to create frontmatter part inside the markdown. Chapter frontmatter can handle `title` attribute, as well as `monetization` to enable Web Monetization chapter lock and also list contributors for that particular chapter. For example

```md
---
title: The Youth from Badril Village
monetization: true
author: Radhy
editor: Zoom, MyEditor
---

Bla bla bla this is the content of chapter...
```