"use client";

import { useEffect, useState } from "react";

import { LIKE_COOLDOWN_SECONDS } from "@/lib/like-location";

type LikeApiData = {
  likeCount?: number;
};

function cooldownStorageKey(storyId: string): string {
  return `danaman-like-cooldown:${storyId}`;
}

function getCooldownRetrySeconds(storyId: string): number {
  if (typeof window === "undefined") return 0;

  const raw = window.localStorage.getItem(cooldownStorageKey(storyId));
  if (!raw) return 0;

  const lastMs = new Date(raw).getTime();
  if (Number.isNaN(lastMs)) return 0;

  const elapsedSeconds = Math.floor((Date.now() - lastMs) / 1000);
  const remaining = LIKE_COOLDOWN_SECONDS - elapsedSeconds;
  return remaining > 0 ? remaining : 0;
}

function setCooldown(storyId: string): void {
  window.localStorage.setItem(cooldownStorageKey(storyId), new Date().toISOString());
}

export function useExperienceLike(storyId: string) {
  const [likeCount, setLikeCount] = useState(0);
  const [canLike, setCanLike] = useState(true);
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);
  const [isLoadingLikes, setIsLoadingLikes] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const initialCooldown = getCooldownRetrySeconds(storyId);
      if (!cancelled) {
        setRetryAfterSeconds(initialCooldown);
        setCanLike(initialCooldown <= 0);
      }

      try {
        const response = await fetch(`/api/likes/${storyId}`);
        const json = (await response.json()) as {
          success?: boolean;
          data?: LikeApiData;
        };
        if (!cancelled && json.success && json.data) {
          setLikeCount(json.data.likeCount ?? 0);
        }
      } catch {
        // Giữ mặc định khi không tải được.
      } finally {
        if (!cancelled) setIsLoadingLikes(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storyId]);

  useEffect(() => {
    if (retryAfterSeconds <= 0) {
      setCanLike(true);
      return;
    }

    setCanLike(false);
    const timer = window.setInterval(() => {
      setRetryAfterSeconds((current) => {
        if (current <= 1) {
          setCanLike(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [retryAfterSeconds]);

  async function handleHeartClick() {
    if (isSaving || !canLike) return;

    const optimisticCount = likeCount + 1;
    setLikeCount(optimisticCount);
    setCanLike(false);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/likes/${storyId}`, { method: "POST" });
      const json = (await response.json()) as {
        success?: boolean;
        data?: LikeApiData;
      };

      if (json.success && json.data) {
        setLikeCount(json.data.likeCount ?? optimisticCount);
        setCooldown(storyId);
        setRetryAfterSeconds(LIKE_COOLDOWN_SECONDS);
      } else {
        setLikeCount((current) => Math.max(0, current - 1));
        setCanLike(getCooldownRetrySeconds(storyId) <= 0);
      }
    } catch {
      setLikeCount((current) => Math.max(0, current - 1));
      setCanLike(getCooldownRetrySeconds(storyId) <= 0);
    } finally {
      setIsSaving(false);
    }
  }

  const heartDisabled = isSaving || isLoadingLikes || !canLike;

  return {
    likeCount,
    canLike,
    heartDisabled,
    handleHeartClick,
  };
}
