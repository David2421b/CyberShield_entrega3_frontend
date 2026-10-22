import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-cyber-bg px-6 text-center"><div><p className="font-mono text-6xl font-bold text-cyber-cyan">404</p><h1 className="mt-4 text-2xl font-bold text-gray-100">Esta página no existe</h1><p className="mt-3 text-cyber-muted">El enlace puede estar roto o la página se movió.</p><Link href="/" className="mt-7 inline-flex rounded-md bg-cyber-cyan px-5 py-3 font-semibold text-cyber-bg">Volver al inicio</Link></div></main>;
}
