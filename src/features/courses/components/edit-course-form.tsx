"use client";

import { useState, type FormEvent } from "react";
import type { Course, CourseCategory, CourseInput } from "../domain/course";

const fieldClass = "mt-2 w-full rounded-lg border border-slate-400/30 bg-[#0a0e17] px-3 py-2.5 text-gray-100 placeholder:text-gray-500 focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-gray-300";

export function EditCourseForm({ course, onSave, onCancel }: { course: Course; onSave: (id: number, input: CourseInput) => Promise<boolean>; onCancel: () => void }) {
  const [values, setValues] = useState({ title: course.title, category: course.category, level: course.level, duration: course.duration, price: String(course.price), image: course.image, description: course.description });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }) as typeof values);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^https?:\/\//.test(values.image.trim())) { setError("Ingresa una URL válida para la imagen."); return; }
    setSaving(true);
    const saved = await onSave(course.id, { ...values, category: values.category as CourseCategory, title: values.title.trim(), level: values.level.trim(), duration: values.duration.trim(), price: Number(values.price), image: values.image.trim(), description: values.description.trim() });
    setSaving(false);
    if (saved) onCancel();
    else setError("No se pudo guardar. Revisa los datos o vuelve a intentarlo.");
  }

  return <form onSubmit={handleSubmit} className="rounded-lg border border-cyber-cyan/30 bg-cyber-bg p-4">
    <h3 className="mb-4 font-semibold text-cyber-cyan">Editar curso</h3>
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2"><label className={labelClass} htmlFor={`edit-title-${course.id}`}>Nombre del curso</label><input id={`edit-title-${course.id}`} required minLength={3} maxLength={180} value={values.title} onChange={(event) => update("title", event.target.value)} className={fieldClass} /></div>
      <div><label className={labelClass} htmlFor={`edit-category-${course.id}`}>Categoría</label><select id={`edit-category-${course.id}`} value={values.category} onChange={(event) => update("category", event.target.value)} className={fieldClass}><option>Red Team</option><option>Blue Team</option><option>DFIR</option></select></div>
      <div><label className={labelClass} htmlFor={`edit-level-${course.id}`}>Nivel</label><input id={`edit-level-${course.id}`} required minLength={2} maxLength={40} value={values.level} onChange={(event) => update("level", event.target.value)} className={fieldClass} /></div>
      <div><label className={labelClass} htmlFor={`edit-duration-${course.id}`}>Duración</label><input id={`edit-duration-${course.id}`} required minLength={2} maxLength={40} value={values.duration} onChange={(event) => update("duration", event.target.value)} className={fieldClass} /></div>
      <div><label className={labelClass} htmlFor={`edit-price-${course.id}`}>Precio (USD)</label><input id={`edit-price-${course.id}`} required type="number" min="0.01" max="99999999.99" step="0.01" value={values.price} onChange={(event) => update("price", event.target.value)} className={fieldClass} /></div>
      <div className="sm:col-span-2"><label className={labelClass} htmlFor={`edit-image-${course.id}`}>URL de imagen</label><input id={`edit-image-${course.id}`} required type="url" maxLength={2000} value={values.image} onChange={(event) => update("image", event.target.value)} className={fieldClass} /></div>
      <div className="sm:col-span-2"><label className={labelClass} htmlFor={`edit-description-${course.id}`}>Descripción</label><textarea id={`edit-description-${course.id}`} required minLength={10} maxLength={5000} rows={3} value={values.description} onChange={(event) => update("description", event.target.value)} className={fieldClass} /></div>
    </div>
    {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
    <div className="mt-4 flex gap-3"><button type="submit" disabled={saving} className="rounded-md bg-cyber-cyan px-4 py-2 text-sm font-semibold text-cyber-bg disabled:opacity-60">{saving ? "Guardando…" : "Guardar cambios"}</button><button type="button" onClick={onCancel} className="rounded-md border border-cyber-border px-4 py-2 text-sm text-gray-200">Cancelar</button></div>
  </form>;
}
