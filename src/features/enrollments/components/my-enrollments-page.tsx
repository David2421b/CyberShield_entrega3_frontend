"use client";

import Link from "next/link";
import { useMyEnrollments } from "../hooks/use-my-enrollments";
import { ProtectedRoute } from "../../auth/components/protected-route";

export function MyEnrollmentsPage() {
  const { data: enrollments, loading, error } = useMyEnrollments();

  return <ProtectedRoute>
    <main className="min-h-screen bg-cyber-bg px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-cyber-cyan hover:underline">← Volver a CyberShield</Link>
        <h1 className="mb-8 mt-4 text-3xl font-bold text-gray-50">Mis inscripciones</h1>
        {loading && <p className="py-10 text-center text-cyber-cyan" role="status">Cargando tus inscripciones…</p>}
        {!loading && error && <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-300" role="alert">{error}</p>}
        {!loading && !error && enrollments.length === 0 && <div className="rounded-xl border border-cyber-border bg-cyber-panel p-8 text-center"><p className="mb-5 text-cyber-muted">Todavía no tienes inscripciones.</p><Link className="rounded-md bg-cyber-cyan px-5 py-3 font-semibold text-cyber-bg" href="/#cursos">Explorar cursos</Link></div>}
        {!loading && !error && enrollments.length > 0 && <div className="grid gap-5">{enrollments.map((item) => <article key={item.id} className="flex flex-col gap-5 rounded-xl border border-cyber-border bg-cyber-panel p-5 sm:flex-row"><img className="h-40 w-full rounded-lg object-cover sm:w-56" src={item.course.image} alt={item.course.title} /><div><span className="text-xs uppercase tracking-wider text-cyber-cyan">{item.status}</span><h2 className="mt-1 text-xl font-bold text-gray-100">{item.course.title}</h2><p className="mt-2 text-sm text-cyber-muted">Solicitud enviada el {new Date(item.createdAt).toLocaleDateString("es-MX")}</p>{item.message && <p className="mt-3 text-sm text-gray-300">{item.message}</p>}</div></article>)}</div>}
      </div>
    </main>
  </ProtectedRoute>;
}
