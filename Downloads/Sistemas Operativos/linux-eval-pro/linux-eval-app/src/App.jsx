// src/App.jsx – Componente raíz de la aplicación
import { useState, useEffect, useCallback } from 'react';
import Navbar     from './components/Navbar.jsx';
import Sidebar    from './components/Sidebar.jsx';
import Home         from './pages/Home.jsx';
import Entorno      from './pages/Entorno.jsx';
import Instalacion  from './pages/Instalacion.jsx';
import Servicios    from './pages/Servicios.jsx';
import Usuarios     from './pages/Usuarios.jsx';
import Permisos     from './pages/Permisos.jsx';
import Pruebas      from './pages/Pruebas.jsx';
import Verificacion from './pages/Verificacion.jsx';
import Capturas     from './pages/Capturas.jsx';

// IDs de secciones en orden
const SECTIONS = ['home','entorno','instalacion','servicios','usuarios','permisos','pruebas','verificacion','capturas'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navegar a sección con scroll suave
  const navigateTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(id);
    setSidebarOpen(false);
  }, []);

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = 'home';
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar fija en top */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Sidebar lateral */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={navigateTo}
        isOpen={sidebarOpen}
      />

      {/* Contenido principal — margen izquierdo para el sidebar */}
      <main className="lg:ml-60 pt-14 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Home         onNavigate={navigateTo} />
          <Entorno      />
          <Instalacion  />
          <Servicios    />
          <Usuarios     />
          <Permisos     />
          <Pruebas      />
          <Verificacion />
          <Capturas     />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-cyan-400/10 text-center">
            <p className="text-slate-600 text-xs font-mono">
              Linux Server PRO · Evaluación Práctica · Ubuntu 22.04 · VirtualBox
            </p>
            <p className="text-slate-700 text-xs mt-1">
              Desplegado en <span className="text-cyan-400">Vercel</span> · Hecho con React + Vite + Tailwind
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
