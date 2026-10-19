"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo de Cursos", href: "#cursos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Inscripción", href: "#contacto" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-cyber-border bg-cyber-bg/95 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link href="#inicio" className="text-2xl font-bold tracking-tight text-gray-50"><span className="font-mono text-cyber-cyan">&lt;/&gt;</span> CyberShield</Link>
        <button type="button" className="flex h-6 w-7 flex-col justify-between md:hidden" aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span className="h-0.5 w-full rounded bg-white" /><span className="h-0.5 w-full rounded bg-white" /><span className="h-0.5 w-full rounded bg-white" />
        </button>
        <nav className={`${menuOpen ? "block" : "hidden"} absolute left-0 top-full w-full border-b border-cyber-border bg-cyber-panel md:static md:block md:w-auto md:border-0 md:bg-transparent`} aria-label="Navegación principal">
          <ul className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-4 md:p-0">
            {links.map((link) => <li key={link.href}><a onClick={() => setMenuOpen(false)} className="block rounded-full border border-transparent px-4 py-2 text-sm font-medium text-cyber-muted transition hover:border-cyan-400/20 hover:bg-cyber-cyan/5 hover:text-cyber-cyan" href={link.href}>{link.label}</a></li>)}
            <li><Link href="/login" onClick={() => setMenuOpen(false)} className="block rounded-full border border-cyber-cyan/30 px-4 py-2 text-sm font-semibold text-cyber-cyan hover:bg-cyber-cyan/10">Ingresar</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
