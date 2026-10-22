"use client";

import { useEffect, useState } from "react";
import { HttpError } from "../../common/http";
import type { Course } from "../../courses/domain/course";
import { getCourses } from "../../courses/services/course-service";

export function useEnrollmentCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getCourses(1, undefined, 100)
      .then((result) => { if (!cancelled) setCourses(result.data); })
      .catch((reason: unknown) => { if (!cancelled) setError(reason instanceof HttpError ? reason.message : "No se pudo cargar la lista de cursos."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { courses, loading, error };
}
