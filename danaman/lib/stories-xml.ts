import fs from "fs";
import path from "path";

import { XMLParser } from "fast-xml-parser";

import type { StoryMockRecord } from "@/lib/story-mock-record";
import type { GroupSize, StoryExperienceUi } from "@/lib/story-experience-ui";
import type { Story } from "@/types";

const GROUP_SIZES: GroupSize[] = ["Nhóm nhỏ", "Nhóm vừa", "Nhóm lớn"];

function ensureArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function parseActive(raw: string | undefined): boolean {
  if (raw === undefined || raw === "") return true;
  const v = String(raw).trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

function parseExperience(raw: Record<string, unknown>): StoryExperienceUi {
  const groupRaw = String(raw.GroupSize ?? "").trim();
  if (!GROUP_SIZES.includes(groupRaw as GroupSize)) {
    throw new Error(`Invalid GroupSize in stories XML: "${groupRaw}"`);
  }
  const groupSize = groupRaw as GroupSize;

  const depBlock = raw.DepartureDates as Record<string, unknown> | undefined;
  const departureDates = ensureArray(depBlock?.Date as string | string[] | undefined).map(String);
  if (!departureDates.length) throw new Error("Experience.DepartureDates missing Date entries");

  const slotBlock = raw.TimeSlots as Record<string, unknown> | undefined;
  const timeSlots = ensureArray(slotBlock?.Slot as string | string[] | undefined).map(String);
  if (!timeSlots.length) throw new Error("Experience.TimeSlots missing Slot entries");

  return buildExperienceInner(raw, groupSize, departureDates, timeSlots);
}

function buildExperienceInner(
  raw: Record<string, unknown>,
  groupSize: GroupSize,
  departureDates: string[],
  timeSlots: string[],
): StoryExperienceUi {
  return {
    durationLabel: String(raw.DurationLabel ?? "").trim() || "3 - 4 tiếng",
    groupSize,
    pricePerPerson: Number(raw.PricePerPerson ?? 0),
    rating: Number(raw.Rating ?? 0),
    reviewCount: Number(raw.ReviewCount ?? 0),
    timeRange: String(raw.TimeRange ?? "").trim(),
    departureDates,
    departureSelectedIndex: Math.min(
      Math.max(0, Number(raw.DepartureSelectedIndex ?? 0)),
      Math.max(0, departureDates.length - 1),
    ),
    timeSlots,
    timeSlotSelectedIndex: Math.min(
      Math.max(0, Number(raw.TimeSlotSelectedIndex ?? 0)),
      Math.max(0, timeSlots.length - 1),
    ),
    includes: String(raw.Includes ?? "").trim(),
    excludes: String(raw.Excludes ?? "").trim(),
    languages: String(raw.Languages ?? "").trim(),
  };
}

function parseStory(el: Record<string, unknown>): StoryMockRecord {
  const id = String(el["@_id"] ?? "").trim();
  const active = parseActive(el["@_active"] as string | undefined);

  const gallery = ensureArray((el.Gallery as Record<string, unknown> | undefined)?.ImageUrl as string | string[]).map(
    String,
  );
  const content = ensureArray((el.Content as Record<string, unknown> | undefined)?.Paragraph as string | string[]).map(
    String,
  );
  const tags = ensureArray((el.Tags as Record<string, unknown> | undefined)?.Tag as string | string[]).map(String);

  const title = String(el.Title ?? "").trim();
  const imageRaw = String(el.Image ?? "").trim();
  const galleryPaths = gallery.length ? gallery : undefined;

  const story: Story = {
    id,
    image: imageRaw,
    gallery: galleryPaths,
    title,
    description: String(el.Description ?? "").trim(),
    content: content.length ? content : undefined,
    quote: el.Quote !== undefined ? String(el.Quote).trim() : undefined,
    author: String(el.Author ?? "").trim(),
    authorAvatar: el.AuthorAvatar !== undefined ? String(el.AuthorAvatar).trim() : undefined,
    publishedAt: el.PublishedAt !== undefined ? String(el.PublishedAt).trim() : undefined,
    location: String(el.Location ?? "").trim(),
    tags: tags.length ? tags : undefined,
    connectionGroup: el.ConnectionGroup !== undefined ? String(el.ConnectionGroup).trim() : undefined,
    readTime: String(el.ReadTime ?? "").trim(),
    category: String(el.Category ?? "").trim(),
  };

  const expRaw = el.Experience as Record<string, unknown> | undefined;
  if (!expRaw) throw new Error(`Story "${id}" missing Experience`);

  return {
    active,
    story,
    experience: parseExperience(expRaw),
  };
}

let cachedRecords: StoryMockRecord[] | null = null;

export function loadStoryMockRecords(): StoryMockRecord[] {
  if (cachedRecords) return cachedRecords;

  const xmlPath = path.join(process.cwd(), "data", "stories-mock.xml");
  const xml = fs.readFileSync(xmlPath, "utf-8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    trimValues: true,
  });
  const doc = parser.parse(xml) as { Stories?: { Story?: Record<string, unknown> | Record<string, unknown>[] } };
  const rawStories = ensureArray(doc.Stories?.Story);
  cachedRecords = rawStories.map((s) => parseStory(s as Record<string, unknown>));
  return cachedRecords;
}

export function loadActiveStoryRecords(): StoryMockRecord[] {
  return loadStoryMockRecords().filter((r) => r.active);
}

/**
 * `id` có trong `stories-mock.xml` và `active="false"`.
 * Dùng để ẩn bản ghi cùng `id` từ DB (XML là nguồn “bật/tắt” hiển thị cho các mock id).
 */
export function isXmlMockStoryInactive(id: string): boolean {
  const record = loadStoryMockRecords().find((r) => r.story.id === id);
  return record !== undefined && !record.active;
}

/** Chỉ trả story có `active="true"` trong XML (story tắt không load / không có API detail). */
export function getMockStoryRecordById(id: string): StoryMockRecord | undefined {
  return loadActiveStoryRecords().find((r) => r.story.id === id);
}
