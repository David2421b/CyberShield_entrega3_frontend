export type CourseCategory = "Red Team" | "Blue Team" | "DFIR";

export interface Course {
  id: number;
  title: string;
  slug: string;
  category: CourseCategory;
  level: string;
  duration: string;
  price: number;
  image: string;
  description: string;
}

export type CourseInput = Omit<Course, "id" | "slug">;

export interface CoursePagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface CoursesResponse {
  pagination: CoursePagination;
  data: Course[];
}
