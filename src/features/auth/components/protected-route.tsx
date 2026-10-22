"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "../domain/user";
import { useAuth } from "../hooks/auth-provider";

export function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: UserRole }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (role && user.role !== role) router.replace("/");
  }, [loading, user, role, router]);

  if (loading || !user || (role && user.role !== role)) {
    return <main className="flex min-h-screen items-center justify-center bg-cyber-bg px-6 text-cyber-cyan" role="status">Verificando sesión…</main>;
  }
  return <>{children}</>;
}
