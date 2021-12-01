# ProgNovel CLI instruction

1. Install ProgNovel CLI to your computer. You need a stable release of [Node.js](https://nodejs.org/) installed first, then in command prompt, run `npm install @prognovel/cli -g`.
2. In an empty folder, open command prompt and run `prognovel new`. Replace logo and configure settings as you'd like in `site-settings.yml` and list your website staffs and contributors in `site-contributors.yml`.
3. You need at least one novel to publish your own ProgNovel app. Again in root folder of your project (where `site-settings.yml` is), run `prognovel novel some-novel-id` (use alphabets and numbers with dash `-` to replace space for your novel ID). Configure novel settings as you'd like.
4. Once your content is ready, run `prognovel publish`. (PRO tips: if you create Discord bot and get Webhook for it, you can connect it in your `site-settings.yml` and your bot will automatically announce new content whenever you successfully publish your content)

After your contents already published in your backend, you are ready to install your frontend.