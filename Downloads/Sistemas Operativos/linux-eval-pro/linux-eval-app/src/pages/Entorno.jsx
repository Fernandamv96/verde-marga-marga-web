// src/pages/Entorno.jsx
import { Server, Monitor, Network, Wifi, AlertTriangle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock from '../components/CodeBlock.jsx';

export default function Entorno() {
  const vms = [
    {
      icon: Server,
      title: 'VM Linux (Servidor)',
      os: 'Ubuntu Server 22.04',
      color: 'cyan',
      specs: [
        { label: 'RAM',      value: '2 GB' },
        { label: 'CPU',      value: '2 cores' },
        { label: 'Disco',    value: '20 GB' },
        { label: 'Red 1',    value: 'NAT (internet)' },
        { label: 'Red 2',    value: 'Red Interna: 192.168.1.1/24' },
        { label: 'Hostname', value: 'server' },
      ],
    },
    {
      icon: Monitor,
      title: 'VM Windows (Cliente)',
      os: 'Windows 10/11',
      color: 'violet',
      specs: [
        { label: 'RAM',   value: '2 GB' },
        { label: 'CPU',   value: '2 cores' },
        { label: 'Disco', value: '40 GB' },
        { label: 'Red',   value: 'Red Interna (DHCP automático)' },
        { label: 'IP',    value: 'Asignada por servidor (DHCP)' },
        { label: 'DNS',   value: '192.168.1.1 (manual o DHCP)' },
      ],
    },
  ];

  const networkConfig = `# Configurar IP estática en Ubuntu Server
# Editar el archivo de netplan:
sudo nano /etc/netplan/00-installer-config.yaml

# ── Contenido del archivo ─────────────────
network:
  version: 2
  ethernets:
    enp0s3:          # Adaptador NAT (internet)
      dhcp4: true
    enp0s8:          # Adaptador Red Interna
      dhcp4: false
      addresses:
        - 192.168.1.1/24

# ── Aplicar configuración ─────────────────
sudo netplan apply
ip a   # verificar IPs`;

  return (
    <section id="entorno" className="section-anchor pb-16">
      <SectionTitle
        number="01"
        title="Configuración del Entorno"
        subtitle="Preparar VirtualBox con dos VMs: un servidor Linux y un cliente Windows, interconectados."
      />

      {/* Diagrama de red */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-5 font-mono">
          Diagrama de Red
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {/* Internet */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center">
              <Wifi size={24} className="text-slate-400" />
            </div>
            <span className="text-xs text-slate-500 font-mono">Internet</span>
          </div>

          {/* Línea */}
          <div className="hidden md:flex items-center gap-0">
            <div className="w-12 h-px bg-slate-600" />
            <div className="text-xs text-slate-600 font-mono px-2">NAT</div>
            <div className="w-12 h-px bg-slate-600" />
          </div>
          <div className="md:hidden h-6 w-px bg-slate-600" />

          {/* Servidor Linux */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-cyan-400/10 border-2 border-cyan-400/30 flex flex-col items-center justify-center glow-cyan">
              <Server size={24} className="text-cyan-400 mb-1" />
              <span className="text-xs text-cyan-400 font-mono font-bold">Linux</span>
            </div>
            <span className="text-xs text-cyan-400 font-mono">192.168.1.1</span>
            <span className="text-xs text-slate-500">Ubuntu Server</span>
          </div>

          {/* Línea red interna */}
          <div className="hidden md:flex items-center gap-0">
            <div className="w-12 h-px bg-cyan-400/30" />
            <div className="px-2 py-1 rounded bg-cyan-400/10 text-xs text-cyan-400 font-mono">Red Interna</div>
            <div className="w-12 h-px bg-cyan-400/30" />
          </div>
          <div className="md:hidden h-6 w-px bg-cyan-400/30" />

          {/* Windows cliente */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-violet-500/10 border-2 border-violet-500/30 flex flex-col items-center justify-center glow-violet">
              <Monitor size={24} className="text-violet-400 mb-1" />
              <span className="text-xs text-violet-400 font-mono font-bold">Windows</span>
            </div>
            <span className="text-xs text-violet-400 font-mono">DHCP → Auto</span>
            <span className="text-xs text-slate-500">Windows 10/11</span>
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <span className="badge bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
            <Network size={10} /> Red Interna: 192.168.1.0/24
          </span>
          <span className="badge bg-violet-500/10 text-violet-400 border border-violet-500/20">
            Gateway: 192.168.1.1
          </span>
          <span className="badge bg-slate-700 text-slate-400">
            NAT: acceso a internet del servidor
          </span>
        </div>
      </div>

      {/* Tarjetas de VMs */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {vms.map(({ icon: Icon, title, os, color, specs }) => (
          <div key={title} className={`glass-card p-6 card-hover border ${
            color === 'cyan' ? 'hover:border-cyan-400/30' : 'hover:border-violet-500/30'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                color === 'cyan' ? 'bg-cyan-400/10' : 'bg-violet-500/10'
              }`}>
                <Icon size={20} className={color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{title}</h3>
                <span className={`text-xs font-mono ${color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`}>
                  {os}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {specs.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-4 text-sm">
                  <span className="text-slate-500 shrink-0">{label}</span>
                  <span className="text-slate-300 font-mono text-xs text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Aviso importante */}
      <div className="flex gap-3 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 mb-8">
        <AlertTriangle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-yellow-400 text-sm font-semibold">Importante – Red Interna en VirtualBox</p>
          <p className="text-slate-400 text-sm mt-1">
            Ambas VMs deben usar <span className="font-mono text-yellow-400">exactamente el mismo nombre</span> de
            red interna en VirtualBox (ej: <span className="font-mono text-yellow-400">"intnet"</span>).
            El servidor necesita IP estática; el cliente usará DHCP.
          </p>
        </div>
      </div>

      {/* Config de red */}
      <CodeBlock code={networkConfig} title="netplan – IP estática en Ubuntu Server" showLineNumbers />
    </section>
  );
}
