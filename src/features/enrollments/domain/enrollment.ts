import type { Course } from "../../courses/domain/course";

export interface Enrollment {
  id: string;
  message: string | null;
  status: string;
  createdAt: string;
  course: Course;
}

export interface AdminEnrollment extends Enrollment {
  user: { id: string; name: string; email: string };
}
