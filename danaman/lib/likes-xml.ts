import fs from "fs";
import path from "path";

import { XMLBuilder, XMLParser } from "fast-xml-parser";

type LikeRecord = {
  id: string;
  count: number;
};

type CooldownRecord = {
  storyId: string;
  locationKey: string;
  lastClickedAt: string;
};

type LikeStore = {
  stories: LikeRecord[];
  cooldowns: CooldownRecord[];
};

import { LIKE_COOLDOWN_SECONDS } from "@/lib/like-location";

export { LIKE_COOLDOWN_SECONDS };

export type LikeStatus = {
  storyId: string;
  likeCount: number;
  canLike: boolean;
  cooldownActive: boolean;
  retryAfterSeconds: number;
  persisted: boolean;
};

export type IncrementLikeResult =
  | {
      success: true;
      storyId: string;
      likeCount: number;
      persisted: true;
      cooldownActive: false;
      retryAfterSeconds: 0;
    }
  | {
      success: false;
      storyId: string;
      likeCount: number;
      persisted: false;
      cooldownActive: true;
      retryAfterSeconds: number;
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
    Cooldown?: Record<string, unknown> | Record<string, unknown>[];
  };
}): LikeStore {
  const rawStories = ensureArray(doc.Likes?.Story);
  const rawCooldowns = ensureArray(doc.Likes?.Cooldown);

  return {
    stories: rawStories
      .map((entry) => ({
        id: String(entry["@_id"] ?? "").trim(),
        count: Math.max(0, Number(entry["@_count"] ?? 0)),
      }))
      .filter((record) => record.id.length > 0),
    cooldowns: rawCooldowns
      .map((entry) => ({
        storyId: String(entry["@_storyId"] ?? "").trim(),
        locationKey: String(entry["@_locationKey"] ?? "").trim(),
        lastClickedAt: String(entry["@_lastClickedAt"] ?? "").trim(),
      }))
      .filter((record) => record.storyId.length > 0 && record.locationKey.length > 0),
  };
}

function readLikeStoreFromXmlFile(): LikeStore {
  if (!fs.existsSync(LIKES_XML_PATH)) {
    return { stories: [], cooldowns: [] };
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
      Cooldown?: Record<string, unknown> | Record<string, unknown>[];
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
  const likesNode: Record<string, unknown> = {
    Story: store.stories.map((record) => ({
      "@_id": record.id,
      "@_count": String(record.count),
    })),
  };

  if (store.cooldowns.length > 0) {
    likesNode.Cooldown = store.cooldowns.map((record) => ({
      "@_storyId": record.storyId,
      "@_locationKey": record.locationKey,
      "@_lastClickedAt": record.lastClickedAt,
    }));
  }

  const body = builder.build({ Likes: likesNode });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`;
  fs.mkdirSync(path.dirname(LIKES_XML_PATH), { recursive: true });
  fs.writeFileSync(LIKES_XML_PATH, xml, "utf-8");
}

async function readLikeStoreFromKv(): Promise<LikeStore> {
  const { kv } = await import("@vercel/kv");
  const cached = await kv.get<LikeStore>(LIKES_KV_KEY);
  if (cached) return cached;

  if (fs.existsSync(LIKES_XML_PATH)) {
    const seeded = readLikeStoreFromXmlFile();
    await kv.set(LIKES_KV_KEY, seeded);
    return seeded;
  }

  return { stories: [], cooldowns: [] };
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

function getRetryAfterSeconds(lastClickedAt: string, now: Date): number {
  const lastMs = new Date(lastClickedAt).getTime();
  if (Number.isNaN(lastMs)) return 0;

  const elapsedSeconds = Math.floor((now.getTime() - lastMs) / 1000);
  const remaining = LIKE_COOLDOWN_SECONDS - elapsedSeconds;
  return remaining > 0 ? remaining : 0;
}

function findCooldown(store: LikeStore, storyId: string, locationKey: string): CooldownRecord | undefined {
  return store.cooldowns.find(
    (entry) => entry.storyId === storyId && entry.locationKey === locationKey,
  );
}

function getStoryCount(store: LikeStore, storyId: string): number {
  return store.stories.find((entry) => entry.id === storyId)?.count ?? 0;
}

export async function getLikeCount(storyId: string): Promise<number> {
  const store = await readLikeStore();
  return getStoryCount(store, storyId);
}

export async function getLikeStatus(storyId: string, locationKey: string, now = new Date()): Promise<LikeStatus> {
  const store = await readLikeStore();
  const likeCount = getStoryCount(store, storyId);
  const cooldown = findCooldown(store, storyId, locationKey);
  const retryAfterSeconds = cooldown ? getRetryAfterSeconds(cooldown.lastClickedAt, now) : 0;
  const cooldownActive = retryAfterSeconds > 0;

  return {
    storyId,
    likeCount,
    canLike: !cooldownActive,
    cooldownActive,
    retryAfterSeconds,
    persisted: true,
  };
}

export async function incrementLikeCount(storyId: string): Promise<number> {
  const store = await readLikeStore();
  const existing = store.stories.find((entry) => entry.id === storyId);

  if (existing) {
    existing.count += 1;
    await writeLikeStore(store);
    return existing.count;
  }

  store.stories.push({ id: storyId, count: 1 });
  await writeLikeStore(store);
  return 1;
}

export async function incrementLikeWithCooldown(
  storyId: string,
  locationKey: string,
  now = new Date(),
): Promise<IncrementLikeResult> {
  const store = await readLikeStore();
  const likeCount = getStoryCount(store, storyId);
  const cooldown = findCooldown(store, storyId, locationKey);
  const retryAfterSeconds = cooldown ? getRetryAfterSeconds(cooldown.lastClickedAt, now) : 0;

  if (retryAfterSeconds > 0) {
    return {
      success: false,
      storyId,
      likeCount,
      persisted: false,
      cooldownActive: true,
      retryAfterSeconds,
    };
  }

  const existing = store.stories.find((entry) => entry.id === storyId);
  const nextCount = existing ? existing.count + 1 : 1;

  if (existing) {
    existing.count = nextCount;
  } else {
    store.stories.push({ id: storyId, count: nextCount });
  }

  const cooldownEntry = findCooldown(store, storyId, locationKey);
  if (cooldownEntry) {
    cooldownEntry.lastClickedAt = now.toISOString();
  } else {
    store.cooldowns.push({
      storyId,
      locationKey,
      lastClickedAt: now.toISOString(),
    });
  }

  await writeLikeStore(store);

  return {
    success: true,
    storyId,
    likeCount: nextCount,
    persisted: true,
    cooldownActive: false,
    retryAfterSeconds: 0,
  };
}
