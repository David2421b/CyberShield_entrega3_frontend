"use client";

import { useState, type FormEvent } from "react";
import type { CourseCategory, CourseInput } from "../domain/course";

const fieldClass = "mt-2 w-full rounded-lg border border-slate-400/30 bg-[#0a0e17] px-3 py-2.5 text-gray-100 placeholder:text-gray-500 focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-gray-300";
const initialValues = { title: "", category: "Red Team" as CourseCategory, level: "", duration: "", price: "", image: "", description: "" };

export function CreateCourseForm({ onCreate, creating }: { onCreate: (input: CourseInput) => Promise<boolean>; creating: boolean }) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update(field: keyof typeof initialValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }) as typeof initialValues);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^https?:\/\//.test(values.image.trim())) { setError("Ingresa una URL válida para la imagen del curso."); return; }
    const added = await onCreate({ ...values, title: values.title.trim(), level: values.level.trim(), duration: values.duration.trim(), price: Number(values.price), image: values.image.trim(), description: values.description.trim() });
    if (added) {
      setValues(initialValues);
      setSuccess("El curso se agregó al catálogo.");
    }
  }

  return <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-cyber-border bg-cyber-panel p-5 sm:p-7">
    <h2 className="mb-5 text-xl font-bold text-gray-100">Agregar curso</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><label className={labelClass} htmlFor="course-title">Nombre del curso</label><input id="course-title" required minLength={3} maxLength={180} value={values.title} onChange={(event) => update("title", event.target.value)} className={fieldClass} /></div>
      <div><label className={labelClass} htmlFor="course-category">Categoría</label><select id="course-category" value={values.category} onChange={(event) => update("category", event.target.value)} className={fieldClass}><option>Red Team</option><option>Blue Team</option><option>DFIR</option></select></div>
      <div><label className={labelClass} htmlFor="course-level">Nivel</label><input id="course-level" required minLength={2} maxLength={40} value={values.level} onChange={(event) => update("level", event.target.value)} className={fieldClass} /></div>
      <div><label className={labelClass} htmlFor="course-duration">Duración</label><input id="course-duration" required minLength={2} maxLength={40} placeholder="40 horas" value={values.duration} onChange={(event) => update("duration", event.target.value)} className={fieldClass} /></div>
      <div><label className={labelClass} htmlFor="course-price">Precio (USD)</label><input id="course-price" required type="number" min="0.01" max="99999999.99" step="0.01" value={values.price} onChange={(event) => update("price", event.target.value)} className={fieldClass} /></div>
      <div className="sm:col-span-2"><label className={labelClass} htmlFor="course-image">URL de imagen</label><input id="course-image" required type="url" maxLength={2000} value={values.image} onChange={(event) => update("image", event.target.value)} className={fieldClass} /></div>
      <div className="sm:col-span-2"><label className={labelClass} htmlFor="course-description">Descripción</label><textarea id="course-description" required minLength={10} maxLength={5000} rows={4} value={values.description} onChange={(event) => update("description", event.target.value)} className={fieldClass} /></div>
    </div>
    {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
    {success && <p role="status" className="mt-4 text-sm text-emerald-300">{success}</p>}
    <button type="submit" disabled={creating} className="mt-5 rounded-md bg-cyber-cyan px-5 py-3 font-semibold text-cyber-bg transition hover:bg-cyber-blue disabled:cursor-wait disabled:opacity-60">{creating ? "Guardando…" : "Agregar curso"}</button>
  </form>;
}
