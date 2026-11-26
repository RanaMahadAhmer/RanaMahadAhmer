// Replaces the content of a Notion page with README.md, converted to Notion
// blocks. Run by .github/workflows/main.yml on every push that changes README.md.
//
//   NOTION_TOKEN=... NOTION_PAGE_ID=... node .github/scripts/sync-notion.mjs README.md
//
// Without NOTION_TOKEN it only converts the file and prints what it would send.

import fs from 'node:fs'
import process from 'node:process'
import { Client } from '@notionhq/client'
import { markdownToBlocks } from '@tryfabric/martian'

const file = process.argv[2] || 'README.md'
const token = process.env.NOTION_TOKEN
// Accept a bare id, a dashed id or a whole page URL.
const pageId = (process.env.NOTION_PAGE_ID || '').trim().match(/[0-9a-f]{32}|[0-9a-f-]{36}/i)?.[0]

const blocks = markdownToBlocks(fs.readFileSync(file, 'utf8'), {
  notionLimits: { truncate: false },
  strictImageUrls: false,
})
console.log(`${file}: ${blocks.length} top-level blocks`)

if (!token) {
  console.log('NOTION_TOKEN not set: dry run, nothing sent')
  process.exit(0)
}
if (!pageId) {
  console.error('NOTION_PAGE_ID is missing or is not a Notion page id or URL')
  process.exit(1)
}

const notion = new Client({ auth: token })

// Clear the page: delete every top-level block on it.
let removed = 0
for (let cursor; ;) {
  const res = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor, page_size: 100 })
  for (const b of res.results) {
    await notion.blocks.delete({ block_id: b.id })
    removed++
  }
  if (!res.has_more) break
  cursor = res.next_cursor
}

// Notion takes at most 100 blocks per append.
for (let i = 0; i < blocks.length; i += 100) {
  await notion.blocks.children.append({ block_id: pageId, children: blocks.slice(i, i + 100) })
}
console.log(`synced ${file} to Notion page ${pageId}: removed ${removed} blocks, wrote ${blocks.length}`)
