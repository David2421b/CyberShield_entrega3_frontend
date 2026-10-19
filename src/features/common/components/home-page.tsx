import { CourseCatalog } from "../../courses/components/course-catalog";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section id="inicio" className="border-b border-cyber-border bg-gradient-to-br from-cyber-bg to-cyber-panel px-6 py-20 text-center md:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-50 md:text-5xl">Aprende Ciberseguridad Práctica y Defensiva</h1>
            <p className="mb-10 text-lg text-cyber-muted">Formación especializada en Hacking Ético, Red Team, Blue Team y Análisis Forense con entornos de laboratorio reales.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#cursos" className="rounded-md bg-cyber-cyan px-7 py-3 font-semibold text-cyber-bg transition hover:-translate-y-0.5 hover:bg-cyber-blue">Explorar Cursos</a>
              <a href="#contacto" className="rounded-md border border-cyber-border px-7 py-3 font-semibold text-gray-100 transition hover:border-cyber-cyan hover:text-cyber-cyan">Inscribirse</a>
            </div>
          </div>
        </section>

        <section id="cursos" className="scroll-mt-24 bg-cyber-bg">
          <div className="mx-auto max-w-[1200px] px-6 py-16">
            <h2 className="mb-3 text-center text-3xl font-bold text-gray-50">Catálogo de Cursos</h2>
            <p className="mb-10 text-center text-lg text-cyber-muted">Selecciona tu área de especialización y domina las herramientas del sector.</p>
            <CourseCatalog />
          </div>
        </section>

        <section id="nosotros" className="scroll-mt-24 border-y border-cyber-border bg-cyber-panel px-6 py-16">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-10 text-center text-3xl font-bold text-gray-50">¿Por qué estudiar en CyberShield Academy?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <article className="rounded-lg border border-cyber-border bg-cyber-bg p-8"><h3 className="mb-3 text-xl font-semibold text-cyber-cyan">Laboratorios Prácticos</h3><p className="text-sm text-cyber-muted">Accede a entornos vulnerables controlados y escenarios de simulación basados en ataques reales.</p></article>
              <article className="rounded-lg border border-cyber-border bg-cyber-bg p-8"><h3 className="mb-3 text-xl font-semibold text-cyber-cyan">Instructores Certificados</h3><p className="text-sm text-cyber-muted">Aprende de profesionales activos en la industria con certificaciones internacionales (OSCP, CEH, CISSP).</p></article>
              <article className="rounded-lg border border-cyber-border bg-cyber-bg p-8"><h3 className="mb-3 text-xl font-semibold text-cyber-cyan">Certificación Validada</h3><p className="text-sm text-cyber-muted">Al culminar cada módulo obtienes un certificado digital verificable para destacar tu perfil profesional.</p></article>
            </div>
          </div>
        </section>
        <section id="contacto" className="scroll-mt-24 bg-[radial-gradient(circle_at_top,rgba(0,242,254,0.08),transparent_30%),#0a0e17] px-6 py-16 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-50">Formulario de Inscripción</h2>
          <p className="text-cyber-muted">Solicita tu cupo o pide información sobre nuestros programas formativos.</p>
          <p className="mt-8 text-sm text-cyber-muted">Para inscribirte, inicia sesión o crea una cuenta.</p>
          <a className="mt-4 inline-flex rounded-md bg-cyber-cyan px-6 py-3 font-semibold text-cyber-bg hover:bg-cyber-blue" href="/login">Ingresar para inscribirme</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
