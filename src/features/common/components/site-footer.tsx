export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-cyber-border bg-cyber-panel px-6 pb-6 pt-12">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 border-b border-cyber-border pb-8 md:flex-row">
        <div><h2 className="mb-2 text-xl font-bold text-cyber-cyan">CyberShield Academy</h2><p className="max-w-sm text-sm text-cyber-muted">Formando la próxima generación de especialistas en ciberseguridad.</p></div>
        <div><h3 className="mb-3 font-semibold text-gray-100">Enlaces Rápidos</h3><ul className="space-y-2 text-sm text-cyber-muted"><li><a className="hover:text-cyber-cyan" href="#inicio">Inicio</a></li><li><a className="hover:text-cyber-cyan" href="#cursos">Cursos</a></li><li><a className="hover:text-cyber-cyan" href="#contacto">Inscripción</a></li></ul></div>
      </div>
      <p className="mx-auto mt-6 max-w-[1200px] text-center text-xs text-cyber-muted">© 2026 CyberShield Academy</p>
    </footer>
  );
}
