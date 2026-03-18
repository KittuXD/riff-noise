import { useState, useEffect, useCallback } from "react";

const FAVORITES_STORAGE_KEY = "riffnoise_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favorites]);

  const addFavorite = useCallback((articleId: string) => {
    setFavorites((prev) => {
      if (prev.includes(articleId)) return prev;
      return [...prev, articleId];
    });
  }, []);

  const removeFavorite = useCallback((articleId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== articleId));
  }, []);

  const toggleFavorite = useCallback((articleId: string) => {
    setFavorites((prev) => {
      if (prev.includes(articleId)) {
        return prev.filter((id) => id !== articleId);
      }
      return [...prev, articleId];
    });
  }, []);

  const isFavorite = useCallback(
    (articleId: string) => favorites.includes(articleId),
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length,
  };
}
