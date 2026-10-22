import Link from "next/link";

export function AuthShell({ title, children, footer }: { title: string; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,242,254,0.09),transparent_32%),#0a0e17] px-5 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-cyber-panel to-cyber-bg p-7 shadow-2xl sm:p-10">
        <Link href="/" className="mb-8 inline-block text-lg font-bold text-gray-50"><span className="font-mono text-cyber-cyan">&lt;/&gt;</span> CyberShield</Link>
        <h1 className="mb-7 text-3xl font-bold text-gray-50">{title}</h1>
        {children}
        <div className="mt-7 border-t border-cyber-border pt-5 text-sm text-cyber-muted">{footer}</div>
      </section>
    </main>
  );
}

export const inputClass = "mt-2 w-full rounded-xl border border-slate-400/30 bg-[#0a0e17]/90 px-4 py-3 text-gray-50 placeholder:text-gray-500 focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20";
export const labelClass = "block text-xs font-bold uppercase tracking-wider text-gray-200";
