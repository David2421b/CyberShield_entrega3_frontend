import type { Course } from "../../courses/domain/course";

export interface Enrollment {
  id: string;
  message: string | null;
  status: string;
  createdAt: string;
  course: Course;
}
