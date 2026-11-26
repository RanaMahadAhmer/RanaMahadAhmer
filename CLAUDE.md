# Working on this repo

`README.md` here is the GitHub profile README (github.com/RanaMahadAhmer). It
mirrors the NER-DEV portfolio in
[RanaMahadAhmer/Portfolio](https://github.com/RanaMahadAhmer/Portfolio), which
is the source of truth: `public/jsons/projects.json` (projects, their live
links, store listings and stacks) and `public/jsons/data.json` (role,
experience, skills, `now`, contact links).

- This README is a brief, good-looking version of the portfolio, shown here
  and on the ner-dev Notion site (https://ner-dev.notion.site/ner-dev). Keep it
  short and plain (no emoji, no terminal look, no "generated from" line), and
  never say anything the portfolio doesn't.
- Don't edit it by hand: it is built from the portfolio. Change
  the portfolio, then from the Portfolio repo run
  `npm run readme -- <path to this README.md>` and
  `npm run check:readme -- <path to this README.md>`.
- Every push that changes README.md runs `.github/workflows/main.yml`, which
  replaces the Notion page's content with it, minus its top heading (the page
  has its own title) (`.github/scripts/sync-notion.mjs`,
  repository secrets `NOTION_TOKEN` and `NOTION_PAGE_ID`).
- Work on `main` only and push straight to it. No branches or pull requests
  unless the owner asks for one.
