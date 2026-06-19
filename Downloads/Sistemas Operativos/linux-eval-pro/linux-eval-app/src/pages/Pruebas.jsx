// src/pages/Pruebas.jsx
import { useState } from 'react';
import { CheckSquare, Square, Terminal, RotateCcw } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import { checklistPruebas } from '../data/content.js';

const colorMap = {
  cyan:    { badge: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',    check: 'text-cyan-400',    bg: 'hover:bg-cyan-400/5 hover:border-cyan-400/20' },
  violet:  { badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', check: 'text-violet-400',  bg: 'hover:bg-violet-500/5 hover:border-violet-500/20' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', check: 'text-emerald-400', bg: 'hover:bg-emerald-500/5 hover:border-emerald-500/20' },
  yellow:  { badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',  check: 'text-yellow-400',  bg: 'hover:bg-yellow-500/5 hover:border-yellow-500/20' },
  orange:  { badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',  check: 'text-orange-400',  bg: 'hover:bg-orange-500/5 hover:border-orange-500/20' },
};

export default function Pruebas() {
  // Estado inicial: todas las pruebas como false (no completadas)
  const initialState = {};
  checklistPruebas.forEach(cat => cat.pruebas.forEach(p => { initialState[p.id] = false; }));
  const [checks, setChecks] = useState(initialState);

  const toggle = (id) => setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  const reset = () => setChecks(initialState);

  const total = Object.keys(checks).length;
  const done  = Object.values(checks).filter(Boolean).length;
  const pct   = Math.round((done / total) * 100);

  return (
    <section id="pruebas" className="section-anchor pb-16">
      <SectionTitle
        number="06"
        title="Pruebas de Verificación"
        subtitle="Checklist interactivo para verificar que todo funciona correctamente antes de la evaluación."
      />

      {/* Progreso general */}
      <div className="glass-card p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-white">Progreso General</h3>
            <p className="text-sm text-slate-400">{done} de {total} pruebas completadas</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-black font-mono ${pct === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {pct}%
            </span>
            <button
              onClick={reset}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"
              title="Reiniciar checklist"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="h-2 bg-navy-950 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              pct === 100
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                : 'bg-gradient-to-r from-cyan-500 to-violet-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {pct === 100 && (
          <p className="mt-3 text-emerald-400 text-sm font-mono">
            ✅ ¡Todo listo! Puedes presentar la evaluación.
          </p>
        )}
      </div>

      {/* Categorías de pruebas */}
      <div className="space-y-5">
        {checklistPruebas.map(({ categoria, color, pruebas }) => {
          const c = colorMap[color] || colorMap.cyan;
          const catDone = pruebas.filter(p => checks[p.id]).length;
          return (
            <div key={categoria} className="glass-card overflow-hidden">
              {/* Header de categoría */}
              <div className="px-5 py-3 border-b border-cyan-400/5 flex items-center justify-between">
                <span className={`badge border font-semibold ${c.badge}`}>
                  {categoria}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {catDone}/{pruebas.length}
                </span>
              </div>

              {/* Lista de pruebas */}
              <div className="divide-y divide-cyan-400/5">
                {pruebas.map(({ id, label, cmd }) => {
                  const isChecked = checks[id];
                  return (
                    <div
                      key={id}
                      onClick={() => toggle(id)}
                      className={`flex items-start gap-3 px-5 py-3.5 cursor-pointer transition-all border border-transparent ${c.bg} ${
                        isChecked ? 'opacity-70' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`mt-0.5 shrink-0 ${isChecked ? c.check : 'text-slate-600'}`}>
                        {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm transition-all ${
                          isChecked ? 'line-through text-slate-500' : 'text-slate-300'
                        }`}>{label}</p>

                        {/* Comando de verificación */}
                        {cmd && (
                          <div className="mt-1.5 flex items-center gap-2">
                            <Terminal size={10} className="text-slate-600 shrink-0" />
                            <code className="text-xs font-mono text-violet-400 bg-violet-500/5 px-2 py-0.5 rounded">
                              {cmd}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
