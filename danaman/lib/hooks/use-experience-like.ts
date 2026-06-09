"use client";

import { useEffect, useState } from "react";

import { LIKE_COOLDOWN_SECONDS, resolveLocationKey } from "@/lib/like-location";

type LikeApiData = {
  likeCount?: number;
  canLike?: boolean;
  cooldownActive?: boolean;
  retryAfterSeconds?: number;
};

export function useExperienceLike(storyId: string) {
  const [likeCount, setLikeCount] = useState(0);
  const [locationKey, setLocationKey] = useState<string | null>(null);
  const [canLike, setCanLike] = useState(false);
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);
  const [isLoadingLikes, setIsLoadingLikes] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const resolvedLocationKey = await resolveLocationKey();
      if (cancelled) return;

      if (!resolvedLocationKey) {
        setLocationKey(null);
        setCanLike(false);
        setIsLoadingLikes(false);
        return;
      }

      setLocationKey(resolvedLocationKey);

      try {
        const response = await fetch(
          `/api/likes/${storyId}?locationKey=${encodeURIComponent(resolvedLocationKey)}`,
        );
        const json = (await response.json()) as {
          success?: boolean;
          data?: LikeApiData;
        };
        if (!cancelled && json.success && json.data) {
          setLikeCount(json.data.likeCount ?? 0);
          setCanLike(json.data.canLike ?? true);
          setRetryAfterSeconds(json.data.retryAfterSeconds ?? 0);
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
      if (locationKey) {
        setCanLike(true);
      }
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
  }, [retryAfterSeconds, locationKey]);

  async function handleHeartClick() {
    if (isSaving || !canLike || !locationKey) return;

    const optimisticCount = likeCount + 1;
    setLikeCount(optimisticCount);
    setCanLike(false);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/likes/${storyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationKey }),
      });
      const json = (await response.json()) as {
        success?: boolean;
        data?: LikeApiData;
      };

      if (json.success && json.data) {
        setLikeCount(json.data.likeCount ?? optimisticCount);
        setRetryAfterSeconds(LIKE_COOLDOWN_SECONDS);
      } else {
        setLikeCount(json.data?.likeCount ?? likeCount);
        setRetryAfterSeconds(json.data?.retryAfterSeconds ?? 0);
        setCanLike(!(json.data?.cooldownActive ?? false));
      }
    } catch {
      setLikeCount((current) => Math.max(0, current - 1));
      setCanLike(true);
    } finally {
      setIsSaving(false);
    }
  }

  const heartDisabled = isSaving || isLoadingLikes || !canLike || !locationKey;

  return {
    likeCount,
    canLike,
    heartDisabled,
    handleHeartClick,
  };
}
