import { http } from "../../common/http";
import type { AdminEnrollment, Enrollment } from "../domain/enrollment";

export function getMyEnrollments() {
  return http<{ data: Enrollment[] }>("/api/inscripciones/mias");
}

export function createEnrollment(input: { courseId: number; message?: string }) {
  return http<{ data: Enrollment }>("/api/inscripciones", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getAllEnrollments() {
  return http<{ data: AdminEnrollment[] }>("/api/inscripciones");
}
