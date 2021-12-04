const siteFilesContent = {
  "site-settings.yml": `site_title: ProgNovel App
contact: example@email.com
disqus_id: prog-novel

### PUBLISHED BOOKS ###
# you can left out a book folder if you're not ready to publish a certain book
novels:
  - yashura-legacy

### WEBMONETIZATION REVSHARE OPTIONS ###

# edit file site-contributors.yml to set up payments for website owners and staff

# when subscribers are reading novels, payment pointers for website owner
# and staffs will be limited to make spaces for novel authors and contributors
# revenue share.
#
# example: 30% limit means owners and staffs will receive 0.3x of their
# usual revenue for subscribers who reading novel, while the rest will be
# distributed among authors and their contributors (editors, proofreaders, illustrators, etc)
limit_global_payment_pointers_share_in_novel: 30%

# unlike global revshare, total revenue share rate for novel contributors
# will be accumulated for every chapters a person credited for
#
# example: authors who wrote 10 chapters with share of 5 will have
# 50 revshare weight, while editor who edits 5 chapter with share of 4
# will have 20 revshare weight

rev_share_contribution_per_chapter:
  author: 5
  translator: 4
  editor: 3
  proofreader: 2
  `,
  "site-contributors.yml": `# 
ProgNovel:
  email: example@email.com
  payment: $ilp.uphold.com/edR8erBDbRyq
  rate: 25

JS_Developer:
  payment: $ilp.uphold.com/edR8erBDbRyq
  rate: 10

Backend_Developer:
  payment: $ilp.uphold.com/edR8erBDbRyq
  rate: 14

generalStaff:
  payment: $ilp.uphold.com/edR8erBDbRyq
  rate: 20

m4naG3R:
  payment: $ilp.uphold.com/edR8erBDbRyq
  rate: 22
`,
};

const githubActionContent = {
  "pull-request": `on:
  pull_request:
    branches:
      - main
    types: [closed]

jobs:
  publish:
    runs-on: ubuntu-latest
    if: |
      github.event.pull_request.merged == true &&
      github.actor!= 'depbot'
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "16"
      - run: npm install
      - run: npm link
      - run: prognovel build
      - run: prognovel publish
`,
};

const components = {
  "home-page": {
    "ComponentsLazy.svelte": `<script lang="ts">
  import UpdatesModule from "components/updates-page/UpdatesModule.svelte";
  import WebMonetizationBanner from "components/web-monetization/WebMonetizationBanner.svelte";
  import ProgNovelPromo from "components/home-page/ProgNovelPromo.svelte";
</script>

<section class="contain">
  <WebMonetizationBanner />
  <UpdatesModule seeAllLink="updates" />
</section>

<ProgNovelPromo />
  `,
  },
};
module.exports = {
  siteFilesContent,
  githubActionContent,
  components,
};
