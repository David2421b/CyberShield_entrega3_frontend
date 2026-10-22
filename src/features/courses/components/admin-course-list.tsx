"use client";

import Link from "next/link";
import { useAdminCourses } from "../hooks/use-admin-courses";
import { ProtectedRoute } from "../../auth/components/protected-route";
import { CreateCourseForm } from "./create-course-form";
import { EditCourseForm } from "./edit-course-form";
import { useState } from "react";

export function AdminCourseList() {
  const { courses, loading, error, deletingId, creating, add, edit, remove, refresh } = useAdminCourses();
  const [editingId, setEditingId] = useState<number | null>(null);

  return <ProtectedRoute role="admin">
    <main className="min-h-screen bg-cyber-bg px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link className="text-sm text-cyber-cyan hover:underline" href="/">← Volver a CyberShield</Link>
        <div className="mb-8 mt-4 flex flex-wrap items-center justify-between gap-4">
          <div><h1 className="text-3xl font-bold text-gray-50">Administración</h1><p className="mt-2 text-cyber-muted">Gestiona el catálogo de CyberShield Academy.</p></div>
          <button type="button" onClick={() => void refresh()} className="rounded-md border border-cyber-border px-4 py-2 text-sm text-gray-100 hover:border-cyber-cyan">Actualizar</button>
        </div>
        <CreateCourseForm onCreate={add} creating={creating} />
        {error && <p role="alert" className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</p>}
        {loading && <p className="py-10 text-center text-cyber-cyan" role="status">Cargando cursos…</p>}
        {!loading && courses.length === 0 && !error && <p className="rounded-lg border border-cyber-border bg-cyber-panel p-6 text-center text-cyber-muted">No hay cursos en el catálogo.</p>}
        {!loading && courses.length > 0 && <div className="overflow-hidden rounded-xl border border-cyber-border bg-cyber-panel">
          <ul className="divide-y divide-cyber-border">{courses.map((course) => <li key={course.id} className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img src={course.image} alt="" className="h-20 w-full rounded-md object-cover sm:w-28" />
              <div className="min-w-0 flex-1"><span className="text-xs font-semibold uppercase tracking-wider text-cyber-cyan">{course.category}</span><h2 className="truncate font-semibold text-gray-100">{course.title}</h2><p className="text-sm text-cyber-muted">${course.price.toFixed(2)} USD · {course.level} · {course.duration}</p></div>
              <div className="flex gap-2"><button type="button" onClick={() => setEditingId(editingId === course.id ? null : course.id)} className="rounded-md border border-cyber-cyan/50 px-4 py-2 text-sm font-semibold text-cyber-cyan hover:bg-cyber-cyan/10">{editingId === course.id ? "Cerrar edición" : "Editar"}</button><button type="button" onClick={() => void remove(course)} disabled={deletingId === course.id} className="rounded-md border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-wait disabled:opacity-50">{deletingId === course.id ? "Eliminando…" : "Eliminar"}</button></div>
            </div>
            {editingId === course.id && <div className="mt-4"><EditCourseForm course={course} onSave={edit} onCancel={() => setEditingId(null)} /></div>}
          </li>)}</ul>
        </div>}
      </div>
    </main>
  </ProtectedRoute>;
}
