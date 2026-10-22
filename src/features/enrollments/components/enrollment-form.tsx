"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../../auth/hooks/auth-provider";
import { useCreateEnrollment } from "../hooks/use-create-enrollment";
import { useEnrollmentCourses } from "../hooks/use-enrollment-courses";

const fieldClass = "mt-2 w-full rounded-xl border border-slate-400/30 bg-[#0a0e17]/90 px-4 py-3 text-gray-50 placeholder:text-gray-500 focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-gray-200";

export function EnrollmentForm() {
  const { user, loading: authLoading } = useAuth();
  const { courses, loading: coursesLoading, error: coursesError } = useEnrollmentCourses();
  const { submit, loading: submitting, error: submissionError, clearError } = useCreateEnrollment();
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleCourseSelection = (event: Event) => {
      const selectedId = (event as CustomEvent<number>).detail;
      setCourseId(String(selectedId));
      setFieldError("");
    };
    window.addEventListener("cybershield:select-course", handleCourseSelection);
    return () => window.removeEventListener("cybershield:select-course", handleCourseSelection);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    clearError();
    if (!courseId) { setFieldError("Selecciona un curso de interés."); return; }
    if (message.trim() !== "" && message.trim().length < 10) { setFieldError("El mensaje debe tener al menos 10 caracteres."); return; }
    try {
      await submit({ courseId: Number(courseId), ...(message.trim() ? { message: message.trim() } : {}) });
      setSuccess(true);
      setCourseId("");
      setMessage("");
    } catch { /* El hook conserva el error para mostrarlo en el formulario. */ }
  }

  return (
    <section id="contacto" className="scroll-mt-24 bg-[radial-gradient(circle_at_top,rgba(0,242,254,0.08),transparent_30%),#0a0e17] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-3 text-center text-3xl font-bold text-gray-50">Formulario de Inscripción</h2>
        <p className="mb-10 text-center text-cyber-muted">Solicita tu cupo o pide información sobre nuestros programas formativos.</p>
        {authLoading && <p className="text-center text-cyber-cyan" role="status">Verificando sesión…</p>}
        {!authLoading && !user && <div className="rounded-xl border border-cyber-border bg-cyber-panel p-7 text-center"><p className="mb-5 text-cyber-muted">Inicia sesión para enviar una solicitud de inscripción.</p><Link href="/login" className="inline-flex rounded-md bg-cyber-cyan px-6 py-3 font-semibold text-cyber-bg">Ingresar</Link><p className="mt-4 text-sm text-cyber-muted">¿Aún no tienes cuenta? <Link className="text-cyber-cyan hover:underline" href="/registro">Regístrate</Link></p></div>}
        {!authLoading && user && <form onSubmit={handleSubmit} noValidate className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-cyber-panel to-cyber-bg p-6 shadow-2xl sm:p-9">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-cyber-blue/5" />
          <div className="relative z-10">
            <div className="mb-5"><label htmlFor="courseId" className={labelClass}>Curso de interés *</label><select id="courseId" value={courseId} onChange={(event) => { setCourseId(event.target.value); setFieldError(""); clearError(); }} disabled={coursesLoading || Boolean(coursesError)} className={`${fieldClass} ${fieldError ? "border-red-500" : ""}`} aria-invalid={Boolean(fieldError)}><option value="">{coursesLoading ? "Cargando cursos…" : "-- Selecciona un curso --"}</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select>{fieldError && <p className="mt-2 text-sm text-red-400">{fieldError}</p>}{coursesError && <p role="alert" className="mt-2 text-sm text-red-400">{coursesError}</p>}</div>
            <div className="mb-6"><label htmlFor="message" className={labelClass}>Mensaje o comentarios</label><textarea id="message" rows={4} value={message} onChange={(event) => { setMessage(event.target.value); setFieldError(""); clearError(); }} placeholder="Cuéntanos tus metas profesionales o inquietudes… (mínimo 10 caracteres)" className={fieldClass} /></div>
            {submissionError && <p role="alert" className="mb-5 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-300">{submissionError}</p>}
            {success && <div role="status" className="mb-5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-300">¡Inscripción recibida! <Link href="/mis-inscripciones" className="font-semibold underline">Ver mis inscripciones</Link></div>}
            <button type="submit" disabled={submitting || coursesLoading || Boolean(coursesError)} className="w-full rounded-xl border border-white/15 bg-gradient-to-r from-cyber-cyan to-cyber-blue px-5 py-4 font-bold uppercase tracking-wider text-cyber-bg shadow-lg shadow-cyber-blue/30 transition hover:-translate-y-0.5 hover:shadow-cyber-blue/40 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Enviando solicitud…" : "Enviar solicitud"}</button>
          </div>
        </form>}
      </div>
    </section>
  );
}
