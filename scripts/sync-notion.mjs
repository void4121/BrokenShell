// Syncs published Notion pages into Jekyll posts.
// Env: NOTION_TOKEN, NOTION_DATABASE_ID
//
// Expected Notion database properties:
//   Name (title) | Slug (text, optional) | Tags (multi-select) |
//   Date (date, optional) | Description (text, optional) | Publish (checkbox)

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const POSTS_DIR = "_posts";
const IMG_DIR = "assets/images/notion";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

let currentSlug = "post";

// Notion image URLs expire after ~1 hour, so download them into the repo.
n2m.setCustomTransformer("image", async (block) => {
  const img = block.image;
  const url = img.type === "external" ? img.external.url : img.file.url;
  const caption = img.caption?.map((t) => t.plain_text).join("") || "image";
  const ext = path.extname(new URL(url).pathname) || ".png";
  const name = crypto.createHash("md5").update(block.id).digest("hex").slice(0, 10) + ext;
  const dir = path.join(IMG_DIR, currentSlug);
  await fs.mkdir(dir, { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image download failed: ${res.status} ${url}`);
  await fs.writeFile(path.join(dir, name), Buffer.from(await res.arrayBuffer()));
  return `![${caption}](/${IMG_DIR}/${currentSlug}/${name})`;
});

const text = (prop) => (prop?.rich_text ?? prop?.title ?? []).map((t) => t.plain_text).join("");
const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function getPublishedPages() {
  const pages = [];
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: { property: "Publish", checkbox: { equals: true } },
      start_cursor: cursor,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return pages;
}

async function main() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  const pages = await getPublishedPages();
  const written = new Set();

  for (const page of pages) {
    const p = page.properties;
    const title = text(p.Name) || "Untitled";
    const slug = text(p.Slug) || slugify(title);
    const date = (p.Date?.date?.start || page.created_time).slice(0, 10);
    const tags = (p.Tags?.multi_select ?? []).map((t) => t.name);
    const description = text(p.Description);
    currentSlug = slug;

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const body = n2m.toMarkdownString(mdBlocks).parent ?? "";

    const frontMatter = [
      "---",
      `title: ${JSON.stringify(title)}`,
      `date: ${date}`,
      `tags: ${JSON.stringify(tags)}`,
      description ? `excerpt: ${JSON.stringify(description)}` : null,
      `notion_id: ${page.id}`,
      "---",
      "",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const file = `${date}-${slug}.md`;
    await fs.writeFile(path.join(POSTS_DIR, file), frontMatter + "\n" + body + "\n");
    written.add(file);
    console.log(`Synced: ${file}`);
  }

  // Remove synced posts that were unpublished, renamed, or deleted in Notion.
  // Only touches files that contain a notion_id, so hand-written posts are safe.
  for (const file of await fs.readdir(POSTS_DIR)) {
    if (written.has(file)) continue;
    const content = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    if (/^notion_id:/m.test(content)) {
      await fs.unlink(path.join(POSTS_DIR, file));
      console.log(`Removed: ${file}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
