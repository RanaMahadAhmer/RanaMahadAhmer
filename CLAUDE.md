# Working on this repo

`README.md` here is the GitHub profile README (github.com/RanaMahadAhmer). It
mirrors the NER-DEV portfolio in
[RanaMahadAhmer/Portfolio](https://github.com/RanaMahadAhmer/Portfolio), which
is the source of truth: `public/jsons/projects.json` (projects, their live
links, store listings and stacks) and `public/jsons/data.json` (role,
experience, skills, `now`, contact links).

- Don't edit this README by hand: it is generated from the portfolio. Change
  the portfolio, then from the Portfolio repo run
  `npm run readme -- <path to this README.md>` and
  `npm run check:readme -- <path to this README.md>`.
- Every push that changes README.md runs `.github/workflows/main.yml`, which
  replaces the Notion page's content with it (`.github/scripts/sync-notion.mjs`,
  repository secrets `NOTION_TOKEN` and `NOTION_PAGE_ID`).
- Work on `main` only and push straight to it. No branches or pull requests
  unless the owner asks for one.
