/** Cooldown giữa hai lần thả tim (client localStorage). */
export const LIKE_COOLDOWN_SECONDS = 3600;

/** @deprecated Chỉ giữ cho component archive — likes mới không dùng geolocation. */
export function resolveLocationKey(): Promise<string | null> {
  return Promise.resolve(null);
}
