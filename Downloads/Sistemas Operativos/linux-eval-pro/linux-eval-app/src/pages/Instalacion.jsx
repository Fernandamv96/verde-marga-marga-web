// src/pages/Instalacion.jsx
import { HardDrive, User, Tag, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import CodeBlock from '../components/CodeBlock.jsx';

export default function Instalacion() {
  const pasos = [
    {
      num: '01',
      icon: HardDrive,
      title: 'Crear VM en VirtualBox',
      desc: 'Nueva VM → Linux → Ubuntu 64-bit. Asignar RAM, disco y los dos adaptadores de red.',
      color: 'cyan',
      notas: ['RAM: 2048 MB mínimo', 'Disco: 20 GB VDI dinámico', 'Red 1: NAT | Red 2: Red Interna'],
    },
    {
      num: '02',
      icon: HardDrive,
      title: 'Montar ISO y arrancar',
      desc: 'Montar la ISO de Ubuntu Server 22.04 en Almacenamiento y arrancar la VM.',
      color: 'violet',
      notas: ['Descargar: ubuntu.com/download/server', 'Seleccionar Ubuntu Server (no Desktop)', 'Boot desde el ISO'],
    },
    {
      num: '03',
      icon: HardDrive,
      title: 'Particionado del disco',
      desc: 'Usar particionado guiado o manual. Partición mínima recomendada:',
      color: 'cyan',
      notas: ['/  (root) → 18 GB ext4', 'swap       → 2 GB', 'GRUB en el disco principal'],
    },
    {
      num: '04',
      icon: User,
      title: 'Configurar usuario inicial',
      desc: 'Crear el usuario administrador del sistema durante la instalación.',
      color: 'violet',
      notas: ['Nombre: admin (o el indicado)', 'Username: admin', 'Contraseña segura y memorizable'],
    },
    {
      num: '05',
      icon: Tag,
      title: 'Hostname y SSH',
      desc: 'Asignar el nombre del servidor y habilitar OpenSSH.',
      color: 'cyan',
      notas: ['Hostname: server', 'Instalar OpenSSH Server: ✓', 'Reiniciar al finalizar'],
    },
  ];

  const postInstall = `# ── Actualizar el sistema ─────────────────
sudo apt update && sudo apt upgrade -y

# ── Verificar conectividad ─────────────────
ping -c 3 google.com      # debe funcionar vía NAT
ip a                       # ver todas las IPs

# ── Cambiar hostname (si es necesario) ─────
sudo hostnamectl set-hostname server
sudo nano /etc/hosts
# Agregar: 127.0.0.1   server

# ── Instalar herramientas útiles ───────────
sudo apt install net-tools curl wget htop -y

# ── Verificar hostname ─────────────────────
hostname
hostname -f`;

  return (
    <section id="instalacion" className="section-anchor pb-16">
      <SectionTitle
        number="02"
        title="Instalación de Linux"
        subtitle="Pasos para instalar Ubuntu Server 22.04 en VirtualBox con la configuración correcta."
        color="violet"
      />

      {/* Timeline de pasos */}
      <div className="relative mb-10">
        {/* Línea vertical */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/40 via-violet-500/40 to-transparent hidden md:block" />

        <div className="space-y-5">
          {pasos.map(({ num, icon: Icon, title, desc, color, notas }) => (
            <div key={num} className="flex gap-5">
              {/* Número / icono */}
              <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 ${
                color === 'cyan'
                  ? 'bg-cyan-400/10 border-cyan-400/30'
                  : 'bg-violet-500/10 border-violet-500/30'
              }`}>
                <span className={`font-mono font-black text-xs ${
                  color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                }`}>{num}</span>
              </div>

              {/* Contenido */}
              <div className="flex-1 glass-card p-5 card-hover">
                <div className="flex items-start gap-3 mb-3">
                  <Icon size={16} className={`mt-0.5 shrink-0 ${
                    color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                  }`} />
                  <div>
                    <h3 className="font-bold text-white text-sm">{title}</h3>
                    <p className="text-slate-400 text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {notas.map((nota) => (
                    <div key={nota} className="flex items-center gap-1.5 text-xs text-slate-400">
                      <CheckCircle size={11} className={color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'} />
                      <span>{nota}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post instalación */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-1">Post-Instalación</h3>
        <p className="text-slate-400 text-sm mb-4">Primeros comandos tras arrancar el servidor por primera vez.</p>
        <CodeBlock code={postInstall} title="bash — configuración inicial" showLineNumbers />
      </div>
    </section>
  );
}
