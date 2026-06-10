import fs from "fs";
import path from "path";

import { XMLBuilder, XMLParser } from "fast-xml-parser";

type LikeRecord = {
  id: string;
  count: number;
};

type LikeStore = {
  stories: LikeRecord[];
};

export type LikeStatus = {
  storyId: string;
  likeCount: number;
};

export type IncrementLikeResult = {
  success: true;
  storyId: string;
  likeCount: number;
};

const LIKES_XML_PATH = path.join(process.cwd(), "data", "likes.xml");
const LIKES_KV_KEY = "danaman:likes-store";

function useKvStorage(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function ensureArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function parseLikeStore(doc: {
  Likes?: {
    Story?: Record<string, unknown> | Record<string, unknown>[];
  };
}): LikeStore {
  const rawStories = ensureArray(doc.Likes?.Story);

  return {
    stories: rawStories
      .map((entry) => ({
        id: String(entry["@_id"] ?? "").trim(),
        count: Math.max(0, Number(entry["@_count"] ?? 0)),
      }))
      .filter((record) => record.id.length > 0),
  };
}

function normalizeLikeStore(value: unknown): LikeStore {
  if (!value || typeof value !== "object") {
    return { stories: [] };
  }

  const record = value as { stories?: LikeRecord[] };
  if (!Array.isArray(record.stories)) {
    return { stories: [] };
  }

  return {
    stories: record.stories
      .map((entry) => ({
        id: String(entry.id ?? "").trim(),
        count: Math.max(0, Number(entry.count ?? 0)),
      }))
      .filter((entry) => entry.id.length > 0),
  };
}

function readLikeStoreFromXmlFile(): LikeStore {
  if (!fs.existsSync(LIKES_XML_PATH)) {
    return { stories: [] };
  }

  const xml = fs.readFileSync(LIKES_XML_PATH, "utf-8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    trimValues: true,
  });
  const doc = parser.parse(xml) as {
    Likes?: {
      Story?: Record<string, unknown> | Record<string, unknown>[];
    };
  };
  return parseLikeStore(doc);
}

function writeLikeStoreToXmlFile(store: LikeStore): void {
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    format: true,
    suppressEmptyNode: true,
  });
  const likesNode = {
    Story: store.stories.map((record) => ({
      "@_id": record.id,
      "@_count": String(record.count),
    })),
  };

  const body = builder.build({ Likes: likesNode });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`;
  fs.mkdirSync(path.dirname(LIKES_XML_PATH), { recursive: true });
  fs.writeFileSync(LIKES_XML_PATH, xml, "utf-8");
}

async function readLikeStoreFromKv(): Promise<LikeStore> {
  const { kv } = await import("@vercel/kv");
  const cached = await kv.get<unknown>(LIKES_KV_KEY);
  if (cached) return normalizeLikeStore(cached);

  if (fs.existsSync(LIKES_XML_PATH)) {
    const seeded = readLikeStoreFromXmlFile();
    await kv.set(LIKES_KV_KEY, seeded);
    return seeded;
  }

  return { stories: [] };
}

async function writeLikeStoreToKv(store: LikeStore): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(LIKES_KV_KEY, store);
}

async function readLikeStore(): Promise<LikeStore> {
  if (useKvStorage()) {
    return readLikeStoreFromKv();
  }
  return readLikeStoreFromXmlFile();
}

async function writeLikeStore(store: LikeStore): Promise<void> {
  if (useKvStorage()) {
    await writeLikeStoreToKv(store);
    return;
  }
  writeLikeStoreToXmlFile(store);
}

function getStoryCount(store: LikeStore, storyId: string): number {
  return store.stories.find((entry) => entry.id === storyId)?.count ?? 0;
}

export async function getLikeCount(storyId: string): Promise<number> {
  const store = await readLikeStore();
  return getStoryCount(store, storyId);
}

export async function getLikeStatus(storyId: string): Promise<LikeStatus> {
  const store = await readLikeStore();
  return {
    storyId,
    likeCount: getStoryCount(store, storyId),
  };
}

export async function incrementLikeCount(storyId: string): Promise<IncrementLikeResult> {
  const store = await readLikeStore();
  const existing = store.stories.find((entry) => entry.id === storyId);
  const nextCount = existing ? existing.count + 1 : 1;

  if (existing) {
    existing.count = nextCount;
  } else {
    store.stories.push({ id: storyId, count: nextCount });
  }

  await writeLikeStore(store);

  return {
    success: true,
    storyId,
    likeCount: nextCount,
  };
}
