// src/pages/Servicios.jsx
import { useState } from 'react';
import { Wifi, Search, Globe, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import { serviciosData } from '../data/content.js';

const tabs = [
  { key: 'dhcp', label: 'DHCP', icon: Wifi,   color: 'cyan' },
  { key: 'dns',  label: 'DNS',  icon: Search,  color: 'violet' },
  { key: 'web',  label: 'Web',  icon: Globe,   color: 'emerald' },
];

const colorMap = {
  cyan:    { tab: 'text-cyan-400 border-cyan-400 bg-cyan-400/5',    badge: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',    dot: 'bg-cyan-400' },
  violet:  { tab: 'text-violet-400 border-violet-500 bg-violet-500/5', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', dot: 'bg-violet-400' },
  emerald: { tab: 'text-emerald-400 border-emerald-500 bg-emerald-500/5', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400' },
};

export default function Servicios() {
  const [activeTab, setActiveTab] = useState('dhcp');
  const data = serviciosData[activeTab];
  const tab = tabs.find(t => t.key === activeTab);
  const colors = colorMap[tab.color];

  return (
    <section id="servicios" className="section-anchor pb-16">
      <SectionTitle
        number="03"
        title="Servicios de Red"
        subtitle="Configuración completa de los tres servicios principales del servidor."
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-8 p-1 glass-card w-fit rounded-xl">
        {tabs.map(({ key, label, icon: Icon, color }) => {
          const active = activeTab === key;
          const c = colorMap[color];
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active ? c.tab + ' border' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon size={14} />
              {label}
              {active && <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />}
            </button>
          );
        })}
      </div>

      {/* Contenido del tab activo */}
      <div className="space-y-6">
        {/* Header del servicio */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className={`badge border ${colors.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
              {data.label} activo
            </span>
          </div>
          <p className="text-slate-400 text-sm">{data.descripcion}</p>
        </div>

        {/* Paso 1: Instalación */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={14} className="text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-300">Paso 1 — Instalación</h3>
          </div>
          <CodeBlock code={data.install} title={`instalar ${data.label.toLowerCase()}`} />
        </div>

        {/* Paso 2: Configuración */}
        {activeTab === 'dhcp' && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={14} className="text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-300">Paso 2 — Configurar /etc/dhcp/dhcpd.conf</h3>
              </div>
              <CodeBlock code={data.config} title="/etc/dhcp/dhcpd.conf" showLineNumbers />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={14} className="text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-300">Paso 3 — Especificar interfaz de red</h3>
              </div>
              <CodeBlock code={data.interfaz} title="/etc/default/isc-dhcp-server" />
            </div>
          </>
        )}

        {activeTab === 'dns' && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={14} className="text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-300">Paso 2 — Configurar zonas en named.conf.local</h3>
              </div>
              <CodeBlock code={data.named} title="/etc/bind/named.conf.local" showLineNumbers />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={14} className="text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-300">Paso 3 — Zona directa</h3>
              </div>
              <CodeBlock code={data.zonaDirecta} title="/etc/bind/db.evallinux.local" showLineNumbers />
            </div>
          </>
        )}

        {activeTab === 'web' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} className="text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-300">Paso 2 — Crear index.html</h3>
            </div>
            <CodeBlock code={data.html} title="/var/www/html/index.html" language="html" showLineNumbers />
          </div>
        )}

        {/* Reiniciar servicio */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={14} className="text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-300">
              {activeTab === 'dhcp' ? 'Paso 4' : activeTab === 'dns' ? 'Paso 4' : 'Paso 3'} — Reiniciar y verificar
            </h3>
          </div>
          <CodeBlock code={data.restart} title={`reiniciar ${data.label.toLowerCase()}`} />
        </div>
      </div>
    </section>
  );
}
