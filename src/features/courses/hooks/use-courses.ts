"use client";

import { useCallback, useEffect, useState } from "react";
import { HttpError } from "../../common/http";
import type { Course, CourseCategory, CoursePagination } from "../domain/course";
import { getCourses } from "../services/course-service";

interface CoursesState {
  data: Course[];
  pagination: CoursePagination | null;
  loading: boolean;
  error: string | null;
}

function readLocation() {
  const params = new URLSearchParams(window.location.search);
  const page = Math.max(1, Number(params.get("page")) || 1);
  const categoryValue = params.get("category");
  const category: CourseCategory | undefined = categoryValue === "Red Team" || categoryValue === "Blue Team" || categoryValue === "DFIR" ? categoryValue : undefined;
  return { page, category };
}

function updateLocation(page: number, category?: CourseCategory) {
  const url = new URL(window.location.href);
  if (page === 1) url.searchParams.delete("page");
  else url.searchParams.set("page", String(page));
  if (category) url.searchParams.set("category", category);
  else url.searchParams.delete("category");
  window.history.pushState({}, "", url);
}

export function useCourses() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<CourseCategory | undefined>();
  const [state, setState] = useState<CoursesState>({ data: [], pagination: null, loading: true, error: null });

  useEffect(() => {
    const location = readLocation();
    setPage(location.page);
    setCategory(location.category);
    const handlePopState = () => {
      const next = readLocation();
      setPage(next.page);
      setCategory(next.category);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setState((current) => ({ ...current, loading: true, error: null }));
    getCourses(page, category)
      .then((response) => {
        if (!cancelled) setState({ data: response.data, pagination: response.pagination, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) setState({ data: [], pagination: null, loading: false, error: error instanceof HttpError ? error.message : "No se pudo conectar con el catálogo." });
      });
    return () => { cancelled = true; };
  }, [page, category]);

  const selectCategory = useCallback((nextCategory?: CourseCategory) => {
    updateLocation(1, nextCategory);
    setPage(1);
    setCategory(nextCategory);
  }, []);

  const selectPage = useCallback((nextPage: number) => {
    const boundedPage = Math.max(1, Math.min(nextPage, state.pagination?.totalPages || 1));
    updateLocation(boundedPage, category);
    setPage(boundedPage);
  }, [category, state.pagination?.totalPages]);

  return { ...state, page, category, selectCategory, selectPage };
}
