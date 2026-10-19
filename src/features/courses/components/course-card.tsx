import type { Course } from "../domain/course";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-cyber-border bg-cyber-card transition duration-300 hover:-translate-y-1 hover:border-cyber-cyan">
      <img src={course.image} alt={course.title} className="h-[180px] w-full bg-cyber-panel object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-2 text-xs font-bold uppercase tracking-wide text-cyber-cyan">{course.category}</span>
        <h3 className="mb-3 text-xl font-bold text-gray-50">{course.title}</h3>
        <p className="mb-6 flex-1 text-sm text-cyber-muted">{course.description}</p>
        <div className="mb-4 flex justify-between border-t border-cyber-border pt-3 text-xs text-cyber-muted">
          <span>Nivel: <strong className="text-gray-100">{course.level}</strong></span>
          <span>Duración: <strong className="text-gray-100">{course.duration}</strong></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">${course.price.toFixed(2)} USD</span>
          <a href="#contacto" className="rounded-md bg-cyber-cyan px-4 py-2 text-sm font-semibold text-cyber-bg transition hover:-translate-y-0.5 hover:bg-cyber-blue">Inscribirse</a>
        </div>
      </div>
    </article>
  );
}
