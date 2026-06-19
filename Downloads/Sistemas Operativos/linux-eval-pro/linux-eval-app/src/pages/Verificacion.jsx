// src/pages/Verificacion.jsx
import { ShieldCheck, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock from '../components/CodeBlock.jsx';

export default function Verificacion() {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const resultados = [
    {
      linea: 'drwxrwx--- 2 admin1 VENTAS  4096 ene 15 10:00 proyectos',
      octal: '770',
      usuario: 'admin1',
      grupo: 'VENTAS',
      dir: 'proyectos',
      color: 'cyan',
      significado: 'admin1 y VENTAS tienen rwx. Otros no pueden acceder.',
    },
    {
      linea: 'drwx------ 2 prueba3 SOPORTE 4096 ene 15 10:00 privado',
      octal: '700',
      usuario: 'prueba3',
      grupo: 'SOPORTE',
      dir: 'privado',
      color: 'violet',
      significado: 'Solo prueba3 tiene rwx. Ni el grupo ni otros pueden entrar.',
    },
  ];

  const verifyAll = `# ══ VERIFICACIÓN COMPLETA DEL SERVIDOR ══════

# 1. Servicios activos
echo "── DHCP ──────────────────────────────"
sudo systemctl is-active isc-dhcp-server

echo "── DNS ───────────────────────────────"
sudo systemctl is-active bind9

echo "── Apache ────────────────────────────"
sudo systemctl is-active apache2

# 2. Usuarios y grupos
echo "── Usuarios ──────────────────────────"
id admin1 && id admin2
id prueba3 && id prueba4

echo "── Grupos ────────────────────────────"
getent group VENTAS
getent group SOPORTE

# 3. Permisos finales
echo "── Permisos /srv/ ────────────────────"
ls -la /srv/

echo "── Permisos /home/prueba3/ ───────────"
ls -la /home/prueba3/

# 4. Red
echo "── IPs del servidor ──────────────────"
ip a | grep inet`;

  const copyLine = async (text, idx) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="verificacion" className="section-anchor pb-16">
      <SectionTitle
        number="07"
        title="Verificación Final"
        subtitle="Resultado esperado de la evaluación y comandos para confirmar que todo está correcto."
        color="violet"
      />

      {/* Resultado esperado */}
      <div className="glass-card overflow-hidden mb-8">
        <div className="px-5 py-3 border-b border-cyan-400/10 flex items-center gap-2 bg-navy-800/50">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span className="text-sm font-semibold text-slate-300">Resultado Esperado — ls -la</span>
          <span className="ml-auto badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ✓ Objetivo
          </span>
        </div>

        <div className="p-5 space-y-4">
          {resultados.map(({ linea, octal, usuario, grupo, dir, color, significado }, i) => (
            <div key={i} className={`rounded-xl p-4 border ${
              color === 'cyan' ? 'bg-cyan-400/5 border-cyan-400/20' : 'bg-violet-500/5 border-violet-500/20'
            }`}>
              {/* Línea del resultado */}
              <div className="flex items-center gap-2 mb-3">
                <code className="flex-1 font-mono text-sm text-slate-200 bg-navy-950 px-3 py-2 rounded-lg overflow-x-auto">
                  {linea}
                </code>
                <button
                  onClick={() => copyLine(linea, i)}
                  className="shrink-0 p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                >
                  {copiedIdx === i ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Desglose visual */}
              <div className="flex flex-wrap gap-3 text-xs font-mono">
                <span className={`px-2 py-1 rounded ${color === 'cyan' ? 'bg-cyan-400/10 text-cyan-400' : 'bg-violet-500/10 text-violet-400'}`}>
                  d = directorio
                </span>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">
                  rwx = {octal === '770' ? 'owner+grupo' : 'solo owner'}
                </span>
                <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-400">
                  owner: {usuario}
                </span>
                <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-400">
                  grupo: {grupo}
                </span>
                <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-400">
                  dir: {dir}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{significado}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Script de verificación completa */}
      <CodeBlock code={verifyAll} title="bash — verificación completa del servidor" showLineNumbers />

      {/* Resumen final */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {[
          { label: 'Servicios OK',    value: '3/3', sub: 'DHCP · DNS · Apache',       color: 'emerald' },
          { label: 'Usuarios OK',     value: '4/4', sub: 'admin1/2 · prueba3/4',       color: 'cyan' },
          { label: 'Permisos OK',     value: '2/2', sub: '770 proyectos · 700 privado', color: 'violet' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="glass-card p-5 text-center card-hover">
            <div className={`text-3xl font-black font-mono mb-1 ${
              color === 'emerald' ? 'text-emerald-400' :
              color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
            }`}>{value}</div>
            <div className="font-semibold text-white text-sm">{label}</div>
            <div className="text-xs text-slate-500 font-mono mt-1">{sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
