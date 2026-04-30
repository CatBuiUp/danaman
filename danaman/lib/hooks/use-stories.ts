"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchStories } from "@/lib/api/stories-client";
import type { Story } from "@/types";

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchStories();
      setStories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error while loading stories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadStories();
  }, [loadStories]);

  return { stories, isLoading, error, reload: loadStories };
}
