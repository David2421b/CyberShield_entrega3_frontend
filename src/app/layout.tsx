import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/hooks/auth-provider";

export const metadata: Metadata = {
  title: "CyberShield Academy — Cursos de Ciberseguridad",
  description: "Formación especializada en ciberseguridad práctica y defensiva.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><AuthProvider>{children}</AuthProvider></body></html>;
}
