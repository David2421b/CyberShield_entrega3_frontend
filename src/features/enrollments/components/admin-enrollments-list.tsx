"use client";

import { useAdminEnrollments } from "../hooks/use-admin-enrollments";

export function AdminEnrollmentsList() {
  const { data, loading, error, refresh } = useAdminEnrollments();

  return <section className="mt-12">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-2xl font-bold text-gray-100">Inscripciones recibidas</h2><p className="mt-1 text-sm text-cyber-muted">Solicitudes de todos los usuarios.</p></div><button type="button" onClick={() => void refresh()} className="rounded-md border border-cyber-border px-4 py-2 text-sm text-gray-100 hover:border-cyber-cyan">Actualizar</button></div>
    {error && <p role="alert" className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</p>}
    {loading && <p role="status" className="py-8 text-center text-cyber-cyan">Cargando inscripciones…</p>}
    {!loading && data.length === 0 && !error && <p className="rounded-lg border border-cyber-border bg-cyber-panel p-5 text-center text-cyber-muted">Todavía no hay inscripciones.</p>}
    {!loading && data.length > 0 && <div className="overflow-x-auto rounded-xl border border-cyber-border"><table className="w-full min-w-[720px] bg-cyber-panel text-left text-sm"><thead className="bg-cyber-card text-xs uppercase tracking-wider text-cyber-muted"><tr><th className="px-4 py-3">Usuario</th><th className="px-4 py-3">Curso</th><th className="px-4 py-3">Fecha</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Mensaje</th></tr></thead><tbody className="divide-y divide-cyber-border">{data.map((enrollment) => <tr key={enrollment.id} className="text-gray-200"><td className="px-4 py-3"><span className="block font-medium">{enrollment.user.name}</span><span className="text-xs text-cyber-muted">{enrollment.user.email}</span></td><td className="px-4 py-3">{enrollment.course.title}</td><td className="px-4 py-3">{new Date(enrollment.createdAt).toLocaleDateString("es-MX")}</td><td className="px-4 py-3"><span className="rounded-full border border-cyber-cyan/30 px-2.5 py-1 text-xs text-cyber-cyan">{enrollment.status}</span></td><td className="max-w-xs px-4 py-3 text-cyber-muted">{enrollment.message || "—"}</td></tr>)}</tbody></table></div>}
  </section>;
}
