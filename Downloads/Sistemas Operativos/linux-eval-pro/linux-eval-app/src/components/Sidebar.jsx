// src/components/Sidebar.jsx
import {
  Home, Server, HardDrive, Globe, Users, Lock,
  CheckSquare, ShieldCheck, Camera, ChevronRight
} from 'lucide-react';
import { navItems } from '../data/navItems.js';

const iconMap = {
  Home, Server, HardDrive, Globe, Users, Lock,
  CheckSquare, ShieldCheck, Camera,
};

export default function Sidebar({ activeSection, onNavigate, isOpen }) {
  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => onNavigate(activeSection)}
        />
      )}

      {/* Sidebar panel */}
      <aside className={`
        fixed top-14 left-0 bottom-0 z-40 w-60 flex flex-col
        bg-navy-900/95 border-r border-cyan-400/10
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Header del sidebar */}
        <div className="px-4 py-4 border-b border-cyan-400/10">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Contenido</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                  text-sm font-medium transition-all duration-150 group
                  ${isActive
                    ? item.color === 'cyan'
                      ? 'bg-cyan-400/10 text-cyan-400 border-l-2 border-cyan-400 rounded-l-none'
                      : 'bg-violet-500/10 text-violet-400 border-l-2 border-violet-500 rounded-l-none'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }
                `}
              >
                <Icon
                  size={15}
                  className={`shrink-0 ${isActive
                    ? item.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                    : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && (
                  <ChevronRight size={12} className={item.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-cyan-400/10">
          <div className="glass-card p-3">
            <p className="text-xs text-slate-500 font-mono leading-relaxed">
              <span className="text-cyan-400">$</span> server@evallinux<br />
              <span className="text-slate-600">~/evaluacion</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
