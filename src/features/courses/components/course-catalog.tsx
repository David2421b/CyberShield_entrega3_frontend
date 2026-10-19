"use client";

import { useCourses } from "../hooks/use-courses";
import type { CourseCategory } from "../domain/course";
import { CourseCard } from "./course-card";

const filters: Array<{ label: string; category?: CourseCategory }> = [
  { label: "Todos" },
  { label: "Red Team", category: "Red Team" },
  { label: "Blue Team", category: "Blue Team" },
  { label: "DFIR", category: "DFIR" },
];

export function CourseCatalog() {
  const { data, pagination, loading, error, category, page, selectCategory, selectPage } = useCourses();
  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-4" aria-label="Filtrar cursos por categoría">
        {filters.map((filter) => {
          const active = filter.category === category;
          return (
            <button key={filter.label} type="button" onClick={() => selectCategory(filter.category)} aria-pressed={active}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${active ? "border-cyber-cyan bg-cyber-cyan text-cyber-bg" : "border-cyber-border bg-cyber-panel text-cyber-muted hover:border-cyber-cyan hover:text-cyber-cyan"}`}>
              {filter.label}
            </button>
          );
        })}
      </div>

      {loading && <p className="py-12 text-center text-cyber-cyan" role="status">Cargando cursos…</p>}
      {!loading && error && <p className="rounded-lg border border-red-500/50 bg-red-500/10 p-5 text-center text-red-300" role="alert">{error}</p>}
      {!loading && !error && data.length === 0 && <p className="py-12 text-center text-cyber-muted">No se encontraron cursos disponibles en esta categoría.</p>}
      {!loading && !error && data.length > 0 && <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{data.map((course) => <CourseCard key={course.id} course={course} />)}</div>}

      {!loading && !error && pagination && pagination.totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Paginación del catálogo">
          <button type="button" onClick={() => selectPage(page - 1)} disabled={page <= 1} className="rounded border border-cyber-border px-4 py-2 text-sm text-gray-100 enabled:hover:border-cyber-cyan disabled:cursor-not-allowed disabled:opacity-40">Anterior</button>
          <span className="text-sm text-cyber-muted">Página {page} de {pagination.totalPages}</span>
          <button type="button" onClick={() => selectPage(page + 1)} disabled={page >= pagination.totalPages} className="rounded border border-cyber-border px-4 py-2 text-sm text-gray-100 enabled:hover:border-cyber-cyan disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button>
        </nav>
      )}
    </div>
  );
}
