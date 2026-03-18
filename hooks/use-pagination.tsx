import { useState, useMemo, useCallback } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  hasMore: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  loadMore: () => void;
  resetPagination: () => void;
  displayedCount: number;
  totalCount: number;
}

export function usePagination<T>({
  items,
  itemsPerPage = 9,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    return items.slice(0, loadedPages * itemsPerPage);
  }, [items, loadedPages, itemsPerPage]);

  const hasMore = loadedPages < totalPages;

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    setLoadedPages(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    setLoadedPages((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const loadMore = useCallback(() => {
    setLoadedPages((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setLoadedPages(1);
  }, []);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    hasMore,
    goToPage,
    nextPage,
    prevPage,
    loadMore,
    resetPagination,
    displayedCount: paginatedItems.length,
    totalCount: items.length,
  };
}
