import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function AdminPage() {
  return <ProtectedRoute role="admin"><main className="min-h-screen bg-cyber-bg px-6 py-14"><div className="mx-auto max-w-5xl"><a className="text-sm text-cyber-cyan hover:underline" href="/">← Volver a CyberShield</a><h1 className="mb-4 mt-4 text-3xl font-bold text-gray-50">Administración</h1><p className="text-cyber-muted">Panel protegido para la gestión del catálogo.</p></div></main></ProtectedRoute>;
}
