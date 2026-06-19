// src/pages/Capturas.jsx
import { Camera, Clock, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import { capturas } from '../data/content.js';

export default function Capturas() {
  return (
    <section id="capturas" className="section-anchor pb-16">
      <SectionTitle
        number="📸"
        title="Capturas de Pantalla"
        subtitle="Lista completa de pantallas que debes capturar para la entrega de la evaluación."
      />

      {/* Aviso */}
      <div className="flex gap-3 p-4 rounded-lg bg-cyan-400/5 border border-cyan-400/20 mb-8">
        <Camera size={16} className="text-cyan-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-cyan-400 text-sm font-semibold">¿Cuántas capturas necesitas?</p>
          <p className="text-slate-400 text-sm mt-1">
            Se requieren <strong className="text-white">{capturas.length} capturas</strong> en total.
            Ordénalas con números (01, 02...) para facilitar la revisión.
            Usa la tecla <code className="font-mono text-cyan-400 bg-cyan-400/10 px-1 rounded">Print Screen</code> o
            la herramienta de recorte de Windows/Linux.
          </p>
        </div>
      </div>

      {/* Grid de capturas */}
      <div className="grid md:grid-cols-2 gap-4">
        {capturas.map(({ id, titulo, desc, cuando, icono }) => (
          <div key={id} className="glass-card p-5 card-hover group">
            <div className="flex items-start gap-4">
              {/* Número */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/20 flex items-center justify-center">
                  <span className="text-lg">{icono}</span>
                </div>
                <span className="font-mono text-xs text-slate-600 font-bold">#{String(id).padStart(2,'0')}</span>
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors mb-1">
                  {titulo}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">{desc}</p>

                {/* Cuándo tomar */}
                <div className="flex items-center gap-1.5">
                  <Clock size={10} className="text-violet-400 shrink-0" />
                  <span className="text-xs text-violet-400 font-medium">{cuando}</span>
                </div>
              </div>

              {/* Checkbox visual */}
              <CheckCircle size={16} className="text-slate-700 group-hover:text-cyan-400/50 transition-colors shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Tip final */}
      <div className="mt-8 glass-card p-6 text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="font-bold text-white mb-2">Consejo para la evaluación</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Antes de llamar al docente, verifica tú mismo cada ítem del checklist (sección 6).
          Si todo muestra ✓, estás listo para la verificación final. ¡Mucho éxito! 🐧
        </p>
      </div>
    </section>
  );
}
