// src/pages/Usuarios.jsx
import { Users, User, Shield } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import { usuariosData, gruposData, comandosUsuarios } from '../data/content.js';

export default function Usuarios() {
  return (
    <section id="usuarios" className="section-anchor pb-16">
      <SectionTitle
        number="04"
        title="Usuarios y Grupos"
        subtitle="Crear y gestionar usuarios del sistema con sus grupos de pertenencia."
        color="violet"
      />

      {/* Grupos */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {gruposData.map(({ grupo, gid, miembros, color }) => (
          <div key={grupo} className={`glass-card p-6 card-hover border ${
            color === 'cyan' ? 'hover:border-cyan-400/30' : 'hover:border-violet-500/30'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                color === 'cyan' ? 'bg-cyan-400/10' : 'bg-violet-500/10'
              }`}>
                <Shield size={18} className={color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'} />
              </div>
              <div>
                <h3 className="font-black text-white font-mono">{grupo}</h3>
                <span className="text-xs text-slate-500 font-mono">GID: {gid}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {miembros.map(m => (
                <div key={m} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border ${
                  color === 'cyan'
                    ? 'bg-cyan-400/5 border-cyan-400/20 text-cyan-300'
                    : 'bg-violet-500/5 border-violet-500/20 text-violet-300'
                }`}>
                  <User size={10} />
                  {m}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tabla de usuarios */}
      <div className="glass-card mb-8 overflow-hidden">
        <div className="px-5 py-3 border-b border-cyan-400/10 flex items-center gap-2">
          <Users size={14} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-300">Lista de Usuarios del Sistema</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyan-400/5">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Usuario</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Grupo</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">UID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Shell</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {usuariosData.map((u, i) => {
                const isVentas = u.grupo === 'VENTAS';
                return (
                  <tr key={u.usuario} className={`border-b border-cyan-400/5 transition-colors hover:bg-white/2 ${
                    i % 2 === 0 ? '' : 'bg-white/[0.01]'
                  }`}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isVentas ? 'bg-cyan-400/10' : 'bg-violet-500/10'
                        }`}>
                          <User size={11} className={isVentas ? 'text-cyan-400' : 'text-violet-400'} />
                        </div>
                        <span className="font-mono text-white font-medium">{u.usuario}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`badge border ${
                        isVentas
                          ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20'
                          : 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                      }`}>{u.grupo}</span>
                    </td>
                    <td className="px-5 py-3 font-mono text-slate-400 text-xs">{u.uid}</td>
                    <td className="px-5 py-3 font-mono text-emerald-400 text-xs">{u.shell}</td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{u.descripcion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comandos */}
      <CodeBlock code={comandosUsuarios} title="bash — crear usuarios y grupos" showLineNumbers />
    </section>
  );
}
