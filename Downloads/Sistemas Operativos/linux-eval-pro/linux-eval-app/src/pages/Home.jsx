// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Terminal, Server, ArrowRight, Cpu, HardDrive, Globe, Users } from 'lucide-react';

// Efecto de escritura
function TypedText({ texts, speed = 60 }) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed]);

  return (
    <span className="text-cyan-400 font-mono">
      {displayed}
      <span className="animate-pulse">█</span>
    </span>
  );
}

export default function Home({ onNavigate }) {
  const stats = [
    { icon: Server,   label: 'Servicios',  value: '3',  sub: 'DHCP · DNS · Web' },
    { icon: Users,    label: 'Usuarios',   value: '4',  sub: 'admin1/2 · prueba3/4' },
    { icon: HardDrive,label: 'Grupos',     value: '2',  sub: 'VENTAS · SOPORTE' },
    { icon: Globe,    label: 'Secciones',  value: '7',  sub: 'Guía completa' },
  ];

  const quickLinks = [
    { id: 'entorno',      label: 'Entorno',      color: 'cyan',    icon: Server },
    { id: 'instalacion',  label: 'Instalación',  color: 'violet',  icon: HardDrive },
    { id: 'servicios',    label: 'Servicios',    color: 'cyan',    icon: Globe },
    { id: 'usuarios',     label: 'Usuarios',     color: 'violet',  icon: Users },
    { id: 'permisos',     label: 'Permisos',     color: 'cyan',    icon: Cpu },
    { id: 'capturas',     label: '📸 Capturas',  color: 'violet',  icon: Terminal },
  ];

  return (
    <section id="home" className="section-anchor min-h-screen pt-4 pb-16">
      {/* Hero */}
      <div className="relative mb-12 rounded-2xl overflow-hidden border border-cyan-400/10 glass-card p-8 md:p-12">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-400">Evaluación Práctica — Linux Server</span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            Evaluación<br />
            <span className="gradient-text">Linux Server PRO</span>
          </h1>

          {/* Subtítulo animado */}
          <div className="text-lg text-slate-400 mb-6 font-mono">
            <span className="text-slate-600">$ </span>
            <TypedText texts={[
              'sudo apt install knowledge',
              'systemctl start evaluation',
              'chmod 755 /srv/success',
              'ping servidor.evallinux.local',
            ]} />
          </div>

          <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">
            Guía interactiva completa para configurar un servidor Linux con DHCP, DNS,
            Apache, usuarios, grupos y permisos. Todo lo que necesitas para aprobar. 🐧
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('entorno')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                         bg-gradient-to-r from-cyan-500 to-cyan-400
                         text-navy-900 font-bold text-sm
                         hover:from-cyan-400 hover:to-cyan-300
                         transition-all hover:shadow-lg hover:shadow-cyan-400/20"
            >
              Comenzar <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('capturas')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                         border border-violet-500/30 text-violet-400
                         hover:bg-violet-500/10 transition-all text-sm font-medium"
            >
              📸 Ver capturas requeridas
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="glass-card p-5 card-hover">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">{value}</div>
                <div className="text-xs font-semibold text-slate-300">{label}</div>
                <div className="text-xs text-slate-600 mt-0.5 font-mono">{sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick nav grid */}
      <div>
        <h3 className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-4">
          Ir a sección →
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map(({ id, label, color, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`
                flex items-center gap-3 p-4 rounded-xl border text-left
                transition-all hover:translate-y-[-2px] group
                ${color === 'cyan'
                  ? 'border-cyan-400/10 hover:border-cyan-400/30 hover:bg-cyan-400/5'
                  : 'border-violet-500/10 hover:border-violet-500/30 hover:bg-violet-500/5'
                }
                bg-navy-800/40
              `}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                ${color === 'cyan' ? 'bg-cyan-400/10' : 'bg-violet-500/10'}`}>
                <Icon size={15} className={color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'} />
              </div>
              <span className="font-medium text-sm text-slate-300 group-hover:text-white transition-colors">
                {label}
              </span>
              <ArrowRight size={12} className="ml-auto text-slate-600 group-hover:text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
