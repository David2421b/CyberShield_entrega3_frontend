import { http } from "../../common/http";
import type { CourseCategory, CoursesResponse } from "../domain/course";

export function getCourses(page: number, category?: CourseCategory, limit = 6) {
  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) query.set("category", category);
  return http<CoursesResponse>(`/api/cursos?${query.toString()}`);
}

export function deleteCourse(id: number) {
  return http<null>(`/api/cursos/${id}`, { method: "DELETE" });
}
