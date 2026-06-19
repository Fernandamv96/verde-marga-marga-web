// src/pages/Permisos.jsx
import { Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import { permisosData, comandosPermisos } from '../data/content.js';

// Componente para visualizar permisos tipo rwxrwxrwx
function PermVisual({ owner, group, others }) {
  const Block = ({ chars, label, color }) => (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-slate-600 uppercase tracking-widest">{label}</span>
      <div className={`flex gap-0.5 px-2 py-1.5 rounded-lg bg-navy-950 border ${
        color === 'green' ? 'border-emerald-500/20' :
        color === 'yellow' ? 'border-yellow-500/20' :
        'border-slate-600/20'
      }`}>
        {chars.split('').map((c, i) => (
          <span key={i} className={`font-mono font-bold text-sm ${
            c === 'r' ? 'text-emerald-400' :
            c === 'w' ? 'text-yellow-400' :
            c === 'x' ? 'text-cyan-400' :
            'text-slate-700'
          }`}>{c}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex items-end gap-3">
      <Block chars={owner}  label="owner"  color="green" />
      <span className="text-slate-700 mb-2 font-mono">|</span>
      <Block chars={group}  label="group"  color="yellow" />
      <span className="text-slate-700 mb-2 font-mono">|</span>
      <Block chars={others} label="others" color="none" />
    </div>
  );
}

const colorBadge = {
  red:    'bg-red-500/10 text-red-400 border-red-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  green:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export default function Permisos() {
  const leyenda = [
    { char: 'r', name: 'read',    valor: '4', color: 'text-emerald-400', desc: 'Leer el archivo/listar directorio' },
    { char: 'w', name: 'write',   valor: '2', color: 'text-yellow-400',  desc: 'Escribir/modificar/crear' },
    { char: 'x', name: 'execute', valor: '1', color: 'text-cyan-400',    desc: 'Ejecutar archivo/entrar al directorio' },
    { char: '-', name: 'none',    valor: '0', color: 'text-slate-600',   desc: 'Sin permiso' },
  ];

  return (
    <section id="permisos" className="section-anchor pb-16">
      <SectionTitle
        number="05"
        title="Permisos de Archivos"
        subtitle="El sistema de permisos Unix define quién puede leer, escribir y ejecutar archivos y directorios."
      />

      {/* Leyenda de símbolos */}
      <div className="glass-card p-5 mb-8">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 font-mono">
          Tabla de valores
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {leyenda.map(({ char, name, valor, color, desc }) => (
            <div key={char} className="bg-navy-950/50 rounded-lg p-3 border border-slate-800/50">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-mono font-black text-2xl ${color}`}>{char}</span>
                <span className="text-xs text-slate-500 font-mono">(+{valor})</span>
              </div>
              <div className="font-mono font-bold text-sm text-slate-300">{name}</div>
              <div className="text-xs text-slate-500 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards de permisos */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {permisosData.map(({ octal, simbolico, desc, owner, group, others, color, ejemplo, warning }) => (
          <div key={octal} className={`glass-card p-5 card-hover border ${
            color === 'red' ? 'border-red-500/20 hover:border-red-500/40' : 'hover:border-cyan-400/20'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`font-mono font-black text-3xl ${
                  color === 'red' ? 'text-red-400' :
                  color === 'yellow' ? 'text-yellow-400' :
                  color === 'green' ? 'text-emerald-400' : 'text-cyan-400'
                }`}>{octal}</span>
                {warning && (
                  <span className="badge bg-red-500/10 text-red-400 border border-red-500/20">
                    <AlertTriangle size={10} /> Peligroso
                  </span>
                )}
              </div>
              <span className={`badge border font-mono ${colorBadge[color] || colorBadge.green}`}>
                {simbolico}
              </span>
            </div>

            {/* Visualización */}
            <div className="mb-4">
              <PermVisual owner={owner} group={group} others={others} />
            </div>

            {/* Descripción */}
            <p className="text-slate-400 text-sm mb-3">{desc}</p>

            {/* Ejemplo */}
            <div className="font-mono text-xs bg-navy-950 rounded-lg px-3 py-2 text-violet-400 border border-violet-500/10">
              {ejemplo}
            </div>
          </div>
        ))}
      </div>

      {/* Tip rápido */}
      <div className="flex gap-3 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 mb-8">
        <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-emerald-400 text-sm font-semibold">Truco para calcular permisos</p>
          <p className="text-slate-400 text-sm mt-1">
            Suma los valores: <span className="font-mono text-emerald-400">r=4 + w=2 + x=1 = 7</span>.
            El número 770 significa: owner=7(rwx), group=7(rwx), others=0(---).
            Solo el dueño y su grupo pueden entrar; otros no.
          </p>
        </div>
      </div>

      {/* Comandos */}
      <CodeBlock code={comandosPermisos} title="bash — chown y chmod" showLineNumbers />
    </section>
  );
}
