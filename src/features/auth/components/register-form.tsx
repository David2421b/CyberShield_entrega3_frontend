"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { HttpError } from "../../common/http";
import { register } from "../services/auth-service";
import { useAuth } from "../hooks/auth-provider";
import { AuthShell, inputClass, labelClass } from "./auth-shell";

type FieldName = "name" | "email" | "password" | "confirmPassword";
type FieldErrors = Partial<Record<FieldName, string>>;

export function RegisterForm() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (!loading && user) router.replace("/"); }, [loading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    if (values.name.trim().length < 3) nextErrors.name = "Escribe tu nombre completo (mínimo 3 caracteres).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "Ingresa un correo electrónico válido.";
    if (values.password.length < 8) nextErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    if (values.password !== values.confirmPassword) nextErrors.confirmPassword = "Las contraseñas no coinciden.";
    setErrors(nextErrors);
    setSuccess("");
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      await register({ name: values.name.trim(), email: values.email.trim(), password: values.password });
      setSuccess("Tu cuenta se creó correctamente. Ya puedes iniciar sesión.");
      setValues({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      if (error instanceof HttpError && error.status === 409) setErrors({ email: error.message });
      else if (error instanceof HttpError && error.details?.length) {
        setErrors(Object.fromEntries(error.details.map(({ field, message }) => [field, message])) as FieldErrors);
      } else setErrors({ email: error instanceof Error ? error.message : "No se pudo crear la cuenta." });
    } finally { setSubmitting(false); }
  }

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccess("");
  }

  return (
    <AuthShell title="Crear cuenta" footer={<>¿Ya tienes cuenta? <Link className="font-semibold text-cyber-cyan hover:underline" href="/login">Ingresar</Link></>}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4"><label htmlFor="name" className={labelClass}>Nombre completo</label><input id="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} className={`${inputClass} ${errors.name ? "border-red-500" : ""}`} aria-invalid={Boolean(errors.name)} />{errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}</div>
        <div className="mb-4"><label htmlFor="email" className={labelClass}>Correo electrónico</label><input id="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} className={`${inputClass} ${errors.email ? "border-red-500" : ""}`} aria-invalid={Boolean(errors.email)} />{errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}</div>
        <div className="mb-4"><label htmlFor="password" className={labelClass}>Contraseña</label><input id="password" type="password" autoComplete="new-password" value={values.password} onChange={(event) => update("password", event.target.value)} className={`${inputClass} ${errors.password ? "border-red-500" : ""}`} aria-invalid={Boolean(errors.password)} />{errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}</div>
        <div className="mb-5"><label htmlFor="confirmPassword" className={labelClass}>Confirmar contraseña</label><input id="confirmPassword" type="password" autoComplete="new-password" value={values.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} className={`${inputClass} ${errors.confirmPassword ? "border-red-500" : ""}`} aria-invalid={Boolean(errors.confirmPassword)} />{errors.confirmPassword && <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>}</div>
        {success && <p role="status" className="mb-5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-300">{success}</p>}
        <button disabled={submitting} type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue px-5 py-3 font-bold uppercase tracking-wider text-cyber-bg shadow-lg shadow-cyber-blue/20 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{submitting ? "Creando cuenta…" : "Crear cuenta"}</button>
      </form>
    </AuthShell>
  );
}
