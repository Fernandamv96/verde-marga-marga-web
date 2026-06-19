// src/components/CodeBlock.jsx
// Bloque de código con resaltado de sintaxis y botón de copiar
import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ code, language = 'bash', title = null, showLineNumbers = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback para navegadores que no soportan clipboard API
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Resaltado simple por tokens de bash
  const highlight = (line) => {
    // Comentarios
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }
    // Comandos clave
    const keywords = ['sudo', 'apt', 'systemctl', 'useradd', 'groupadd', 'passwd', 'chmod', 'chown', 'mkdir', 'ls', 'cat', 'nano', 'ping', 'nslookup', 'ipconfig', 'getent'];
    const parts = line.split(/(\s+)/);
    return parts.map((part, i) => {
      if (keywords.includes(part)) return <span key={i} className="text-cyan-400 font-semibold">{part}</span>;
      if (part.startsWith('-')) return <span key={i} className="text-yellow-400">{part}</span>;
      if (part.startsWith('/')) return <span key={i} className="text-violet-400">{part}</span>;
      if (part.match(/^\d+(\.\d+)*$/)) return <span key={i} className="text-emerald-400">{part}</span>;
      if (part.match(/^(restart|enable|status|start|stop)$/)) return <span key={i} className="text-orange-400">{part}</span>;
      return <span key={i} className="text-slate-200">{part}</span>;
    });
  };

  const lines = code.split('\n');

  return (
    <div className="terminal group relative">
      {/* Header de terminal */}
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500" />
        <span className="terminal-dot bg-yellow-500" />
        <span className="terminal-dot bg-green-500" />
        <div className="flex items-center gap-2 ml-2 flex-1">
          <Terminal size={12} className="text-slate-500" />
          <span className="text-xs text-slate-500 font-mono">
            {title || (language === 'bash' ? 'bash — server@evallinux' : language)}
          </span>
        </div>
        {/* Botón copiar */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-700/50 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 border border-transparent hover:border-cyan-400/20'
          }`}
          title="Copiar código"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {/* Cuerpo con código */}
      <div className="terminal-body relative scanlines">
        <pre className="relative z-10 overflow-x-auto">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-slate-600 mr-4 w-6 text-right shrink-0 text-xs leading-6">
                  {i + 1}
                </span>
              )}
              <code className="leading-6 block min-w-0">
                {highlight(line)}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
