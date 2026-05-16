/**
 * Đọc URL ảnh từ data/stories-mock.xml và lưu vào public/stories/
 * theo slug tiêu đề: {slug}.jpg, {slug}-1.jpg, ...
 *
 * Đặt tạm URL https trong Image / ImageUrl nếu cần tải lại file vào public/stories/.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { XMLParser } from "fast-xml-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function ensureArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function slugifyStoryTitle(title) {
  let s = String(title).trim().replaceAll("đ", "d").replaceAll("Đ", "d");
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function downloadToFile(url, destPath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
}

const xmlPath = path.join(root, "data", "stories-mock.xml");
const outDir = path.join(root, "public", "stories");

const xml = fs.readFileSync(xmlPath, "utf-8");
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});
const doc = parser.parse(xml);
const rawStories = ensureArray(doc.Stories?.Story);

for (const el of rawStories) {
  const title = String(el.Title ?? "").trim();
  const slug = slugifyStoryTitle(title);
  if (!slug) {
    console.warn("Skip: empty slug for title", title);
    continue;
  }

  const mainUrl = String(el.Image ?? "").trim();
  const galleryUrls = ensureArray(el.Gallery?.ImageUrl).map(String).filter(Boolean);

  if (mainUrl && /^https?:\/\//i.test(mainUrl)) {
    const dest = path.join(outDir, `${slug}.jpg`);
    console.log("→", path.relative(root, dest));
    try {
      await downloadToFile(mainUrl, dest);
    } catch (e) {
      console.error("FAILED main", slug, e.message);
    }
  }

  for (let i = 0; i < galleryUrls.length; i++) {
    const u = galleryUrls[i];
    if (!/^https?:\/\//i.test(u)) continue;
    const dest = path.join(outDir, `${slug}-${i + 1}.jpg`);
    console.log("→", path.relative(root, dest));
    try {
      await downloadToFile(u, dest);
    } catch (e) {
      console.error("FAILED gallery", slug, i + 1, e.message);
    }
  }
}

console.log("Done.");
