import { http } from "../../common/http";
import type { Enrollment } from "../domain/enrollment";

export function getMyEnrollments() {
  return http<{ data: Enrollment[] }>("/api/inscripciones/mias");
}
