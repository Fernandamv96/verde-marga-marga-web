<div align="center">

<br />

```
██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗    ███████╗██╗   ██╗ █████╗ ██╗
██║     ██║████╗  ██║██║   ██║╚██╗██╔╝    ██╔════╝██║   ██║██╔══██╗██║
██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝     █████╗  ██║   ██║███████║██║
██║     ██║██║╚██╗██║██║   ██║ ██╔██╗     ██╔══╝  ╚██╗ ██╔╝██╔══██║██║
███████╗██║██║ ╚████║╚██████╔╝██╔╝ ██╗    ███████╗ ╚████╔╝ ██║  ██║███████╗
╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝    ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝
```

# Linux Server PRO · Evaluación Interactiva

**Guía web visual e interactiva para la evaluación práctica de Linux Server**
Configuración de entorno · DHCP · DNS · Apache · Usuarios · Permisos · Checklist

<br />

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
&nbsp;
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10b981?style=flat-square)

<br />

</div>

---

## ✨ Vista general

Esta aplicación es una **guía educativa interactiva** pensada para estudiantes que deben rendir una evaluación práctica de administración de servidores Linux. Reemplaza los PDFs estáticos con una experiencia tipo dashboard moderna: navegación lateral, bloques de código con botón copiar, checklist con barra de progreso en tiempo real y visualización de permisos `rwx`.

> **Stack:** React 18 + Vite · Tailwind CSS · Lucide React · JetBrains Mono / Inter
> **Deploy:** Vercel (detección automática de Vite)

---

## 🗂 Tabla de contenidos

- [Características](#-características)
- [Secciones de la guía](#-secciones-de-la-guía)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Inicio rápido](#-inicio-rápido)
- [Deploy en Vercel](#-deploy-en-vercel)
- [Stack tecnológico](#-stack-tecnológico)
- [Configuración de red evaluada](#-configuración-de-red-evaluada)
- [Contribuir](#-contribuir)

---

## 🚀 Características

| Feature | Descripción |
|---|---|
| **Navegación inteligente** | Sidebar fija con scroll-spy: resalta la sección activa automáticamente |
| **Bloques de código** | Resaltado de sintaxis bash + botón **Copiar** con confirmación visual |
| **Tabs interactivos** | Sección Servicios con tabs para DHCP, DNS y Apache sin recargar |
| **Checklist en vivo** | Pruebas con barra de progreso actualizada al marcar cada ítem |
| **Visualizador rwx** | Cards interactivas que explican cada permiso (777, 770, 700, 755) |
| **Hero animado** | Efecto typewriter con comandos Linux reales en el home |
| **Diagrama de red** | Topología visual Linux ↔ Windows con IPs y adaptadores |
| **Timeline de instalación** | Pasos de Ubuntu Server con notas clave en cada etapa |
| **10 capturas requeridas** | Lista con ícono, descripción y momento exacto de toma |
| **Diseño responsive** | Funciona en móvil, tablet y escritorio |

---

## 📚 Secciones de la guía

```
🏠  Home              →  Hero animado · stats · navegación rápida
⚙️  01 Entorno        →  VirtualBox · VMs · diagrama de red topológico
💻  02 Instalación    →  Timeline Ubuntu Server 22.04 · particiones · hostname
🌐  03 Servicios      →  DHCP · DNS (BIND9) · Apache2 — en tabs interactivos
👥  04 Usuarios       →  Tabla de usuarios · cards de grupos · comandos useradd
📁  05 Permisos       →  Visualizador rwx · chmod · chown · ejemplos prácticos
✅  06 Pruebas        →  Checklist interactivo con barra de progreso en tiempo real
🛡️  07 Verificación   →  Resultado esperado · script de verificación completa
📸  Capturas          →  10 pantallas requeridas con momento y descripción exacta
```

---

## 🗃 Estructura del proyecto

```
linux-eval-app/
│
├── index.html                  # Entry point HTML (Google Fonts: Inter + JetBrains Mono)
├── vite.config.js              # Configuración de Vite + plugin React
├── tailwind.config.js          # Paleta personalizada: navy, cyan, violet, emerald
├── postcss.config.js
├── vercel.json                 # Deploy config → outputDirectory: dist
├── package.json
│
└── src/
    ├── main.jsx                # ReactDOM.createRoot entry
    ├── App.jsx                 # Layout raíz · scroll-spy · navegación
    ├── index.css               # Tailwind + utilidades: glass-card, terminal, glow-*
    │
    ├── components/
    │   ├── Navbar.jsx          # Barra superior glassmorphism fija (z-50)
    │   ├── Sidebar.jsx         # Menú lateral colapsable · overlay en móvil
    │   ├── CodeBlock.jsx       # Terminal animada · resaltado bash · botón copiar
    │   └── SectionTitle.jsx    # Cabeceras de sección reutilizables con número
    │
    ├── pages/
    │   ├── Home.jsx            # Hero typewriter · stats cards · quicknav grid
    │   ├── Entorno.jsx         # Diagrama red · cards VM Linux/Windows
    │   ├── Instalacion.jsx     # Timeline vertical con 5 pasos + post-install
    │   ├── Servicios.jsx       # Tabs DHCP / DNS / Apache + CodeBlocks por paso
    │   ├── Usuarios.jsx        # Tabla usuarios · cards grupos · comandos
    │   ├── Permisos.jsx        # PermVisual component · 4 cards de permisos
    │   ├── Pruebas.jsx         # Checklist con estado local · barra de progreso
    │   ├── Verificacion.jsx    # Resultado ls -la · script verificación total
    │   └── Capturas.jsx        # Grid 10 capturas con ícono, cuándo y descripción
    │
    └── data/
        ├── navItems.js         # Items del sidebar con id, label, icon, color
        └── content.js          # Todo el contenido técnico: comandos, configs, data
```

---

## ⚡ Inicio rápido

### Requisitos

- [Node.js](https://nodejs.org/) ≥ 18
- npm ≥ 9

### Instalación

```bash
# 1. Clonar o descomprimir el proyecto
cd linux-eval-app

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm run dev
```

Abre **http://localhost:5173** en tu navegador.

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción → /dist
npm run preview  # Preview del build de producción
```

---

## 🌐 Deploy en Vercel

### Opción A — GitHub + Vercel (recomendado)

```bash
# Inicializar repositorio Git
git init
git add .
git commit -m "feat: Linux Eval PRO inicial"

# Crear repo en github.com y hacer push
git remote add origin https://github.com/TU_USUARIO/linux-eval-app.git
git push -u origin main
```

Luego en [vercel.com](https://vercel.com):
1. **New Project** → importar el repositorio
2. Vercel detecta Vite automáticamente
3. Clic en **Deploy** → URL pública en ~30 segundos ✓

### Opción B — Vercel CLI (más directo)

```bash
npm install -g vercel
vercel
```

Responder las preguntas del asistente interactivo y en minutos tendrás una URL pública.

### Variables de entorno

Este proyecto no requiere variables de entorno. El `vercel.json` incluido configura el deploy automáticamente:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🛠 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev) | 18.2 | UI components + estado local |
| [Vite](https://vitejs.dev) | 5.1 | Build tool + HMR |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Estilos utility-first |
| [Lucide React](https://lucide.dev) | 0.383 | Iconografía SVG |
| [Inter](https://rsms.me/inter/) | — | Tipografía de interfaz |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | — | Tipografía de código |

### Decisiones de diseño

- **Paleta navy + cyan eléctrico** — evoca terminales y entornos de servidor sin caer en el verde-sobre-negro genérico
- **Glassmorphism sutil** — `bg-navy-800/60 backdrop-blur` para capas sin peso visual excesivo
- **Scroll-spy nativo** — detección de sección activa con `getBoundingClientRect` sin dependencias externas
- **Resaltado de bash manual** — tokenización ligera inline para reducir bundle sin `react-syntax-highlighter`

---

## 🔌 Configuración de red evaluada

```
┌─────────────┐     NAT      ┌──────────────────────┐   Red Interna   ┌──────────────┐
│   Internet  │─────────────▶│  Ubuntu Server 22.04 │◀───────────────▶│ Windows 10   │
└─────────────┘              │  IP: 192.168.1.1/24  │ 192.168.1.0/24  │  IP: DHCP    │
                             │  Hostname: server     │                 │  GW:  .1.1   │
                             │                       │                 │  DNS: .1.1   │
                             │  Servicios activos:   │                 └──────────────┘
                             │  · DHCP  (isc-dhcp)  │
                             │  · DNS   (bind9)      │
                             │  · Web   (apache2)    │
                             └──────────────────────┘

Usuarios    admin1, admin2   →  grupo VENTAS   →  /srv/proyectos  (chmod 770)
            prueba3, prueba4 →  grupo SOPORTE  →  ~/privado       (chmod 700)
```

---

## 🤝 Contribuir

¿Encontraste un error en algún comando o quieres agregar una sección?

```bash
# Fork del repo → clonar → nueva rama
git checkout -b fix/nombre-del-arreglo

# El contenido técnico está centralizado — modificar aquí actualiza toda la app
nano src/data/content.js

# Testear localmente
npm run dev

# Commit y pull request
git commit -m "fix: descripción del cambio"
git push origin fix/nombre-del-arreglo
```

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir con atribución.

---

<div align="center">

Hecho con 🐧 para estudiantes de administración de sistemas Linux

**React + Vite + Tailwind · Deploy en [Vercel](https://vercel.com)**

</div>
