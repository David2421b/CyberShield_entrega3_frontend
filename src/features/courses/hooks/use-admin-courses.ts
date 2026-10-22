"use client";

import { useCallback, useEffect, useState } from "react";
import { HttpError } from "../../common/http";
import type { Course, CourseInput } from "../domain/course";
import { createCourse, deleteCourse, getCourses, updateCourse } from "../services/course-service";

export function useAdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getCourses(1, undefined, 100);
      setCourses(result.data);
    } catch (reason) {
      setError(reason instanceof HttpError ? reason.message : "No se pudo cargar el catálogo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const remove = useCallback(async (course: Course) => {
    const accepted = window.confirm(`¿Eliminar “${course.title}” del catálogo? Esta acción no se puede deshacer.`);
    if (!accepted) return;
    setDeletingId(course.id);
    setError("");
    try {
      await deleteCourse(course.id);
      setCourses((current) => current.filter((item) => item.id !== course.id));
    } catch (reason) {
      setError(reason instanceof HttpError ? reason.message : "No se pudo eliminar el curso.");
    } finally {
      setDeletingId(null);
    }
  }, []);

  const add = useCallback(async (input: CourseInput) => {
    setCreating(true);
    setError("");
    try {
      const course = await createCourse(input);
      setCourses((current) => [...current, course].sort((a, b) => a.id - b.id));
      return true;
    } catch (reason) {
      setError(reason instanceof HttpError ? reason.message : "No se pudo crear el curso.");
      return false;
    } finally {
      setCreating(false);
    }
  }, []);

  const edit = useCallback(async (id: number, input: CourseInput) => {
    setError("");
    try {
      const updatedCourse = await updateCourse(id, input);
      setCourses((current) => current.map((course) => course.id === id ? updatedCourse : course));
      return true;
    } catch (reason) {
      setError(reason instanceof HttpError ? reason.message : "No se pudo actualizar el curso.");
      return false;
    }
  }, []);

  return { courses, loading, error, deletingId, creating, add, edit, remove, refresh };
}
