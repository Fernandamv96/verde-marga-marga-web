// src/components/Navbar.jsx
import { Menu, X, Terminal, Github } from 'lucide-react';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 gap-4
                    bg-navy-900/80 backdrop-blur-md border-b border-cyan-400/10">
      {/* Botón hamburguesa (móvil) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden text-slate-400 hover:text-cyan-400 transition-colors p-1"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo / Título */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
          <Terminal size={14} className="text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold text-sm tracking-wide">Linux Server</span>
          <span className="text-cyan-400 text-xs font-mono">PRO Evaluación</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tags / badges */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="badge bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">Ubuntu 22.04</span>
        <span className="badge bg-violet-500/10 text-violet-400 border border-violet-500/20">VirtualBox</span>
        <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">● Online</span>
      </div>

      {/* GitHub link */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-500 hover:text-white transition-colors"
        title="Ver en GitHub"
      >
        <Github size={18} />
      </a>
    </nav>
  );
}
