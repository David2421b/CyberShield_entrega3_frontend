"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { HttpError } from "../../common/http";
import { useAuth } from "../hooks/auth-provider";
import { AuthShell, inputClass, labelClass } from "./auth-shell";

export function LoginForm() {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (!loading && user) router.replace("/"); }, [loading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");
    setFormError("");
    if (!email.trim()) { setFieldError("Ingresa tu correo electrónico."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setFieldError("Ingresa un correo electrónico válido."); return; }
    if (!password) { setFormError("Ingresa tu contraseña."); return; }
    setSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      router.replace("/");
    } catch (error) {
      setFieldError(error instanceof HttpError ? error.message : "No se pudo iniciar sesión. Intenta de nuevo.");
    } finally { setSubmitting(false); }
  }

  return (
    <AuthShell title="Ingresar" footer={<>¿Todavía no tienes cuenta? <Link className="font-semibold text-cyber-cyan hover:underline" href="/registro">Crear cuenta</Link></>}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5"><label htmlFor="email" className={labelClass}>Correo electrónico</label><input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setFieldError(""); }} className={`${inputClass} ${fieldError ? "border-red-500" : ""}`} aria-invalid={Boolean(fieldError)} aria-describedby={fieldError ? "email-error" : undefined} />{fieldError && <p id="email-error" className="mt-2 text-sm text-red-400">{fieldError}</p>}</div>
        <div className="mb-5"><label htmlFor="password" className={labelClass}>Contraseña</label><input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setFormError(""); }} className={inputClass} aria-invalid={Boolean(formError)} aria-describedby={formError ? "password-error" : undefined} />{formError && <p id="password-error" className="mt-2 text-sm text-red-400">{formError}</p>}</div>
        <button disabled={submitting} type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue px-5 py-3 font-bold uppercase tracking-wider text-cyber-bg shadow-lg shadow-cyber-blue/20 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{submitting ? "Ingresando…" : "Iniciar sesión"}</button>
      </form>
    </AuthShell>
  );
}
