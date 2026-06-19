// src/components/SectionTitle.jsx
export default function SectionTitle({ number, title, subtitle, color = 'cyan' }) {
  const accent = color === 'violet'
    ? 'text-violet-400 border-violet-500/30 bg-violet-500/10'
    : 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10';

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-2">
        {number && (
          <span className={`font-mono text-xs px-2.5 py-1 rounded-full border font-bold ${accent}`}>
            {number}
          </span>
        )}
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {subtitle && <p className="mt-1 text-slate-400 text-sm">{subtitle}</p>}
    </div>
  );
}
