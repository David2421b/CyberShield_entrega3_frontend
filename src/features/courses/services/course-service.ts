import { http } from "../../common/http";
import type { CourseCategory, CoursesResponse } from "../domain/course";

export function getCourses(page: number, category?: CourseCategory) {
  const query = new URLSearchParams({ page: String(page), limit: "6" });
  if (category) query.set("category", category);
  return http<CoursesResponse>(`/api/cursos?${query.toString()}`);
}
