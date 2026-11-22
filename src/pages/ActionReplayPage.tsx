import React, { useState } from 'react';
import actionReplayData from '../data/action_replay.json';
import { ActionReplayDoc, ARCode } from '../types/actionReplay';
import { Terminal, Copy, Check, AlertTriangle, Sparkles, ShieldAlert, Cpu } from 'lucide-react';

export const ActionReplayPage: React.FC = () => {
  const data = actionReplayData as ActionReplayDoc;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <Terminal className="w-4 h-4" />
          <span>Recomendaciones Oficiales de Drayano</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Códigos Action Replay de Calidad de Vida
        </h1>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          Códigos Action Replay diseñados para agilizar los tiempos muertos de la partida (texto instantáneo, saltar animaciones de MOs, curación rápida y revanchas ilimitadas). <strong>Ninguno de estos códigos disminuye la dificultad ni regala ventajas en batalla</strong>.
        </p>
      </div>

      {/* Game ID & Compatibility Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Game ID (Versión Completa):</span>
            <span className="text-lg font-mono font-bold text-amber-400 tracking-wider">
              {data.gameId}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 sm:text-right">
          <p>Compatible con Flashcards (R4, Acekard),</p>
          <p className="text-slate-500">DeSmuME, MelonDS y No$GBA.</p>
        </div>
      </div>

      {/* Codes List */}
      <div className="flex flex-col gap-5">
        {data.codes.map((item: ARCode) => (
          <section
            key={item.id}
            id={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col gap-4 shadow-md"
          >
            {/* Header of code */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {item.category}
                </span>
              </div>

              <button
                onClick={() => handleCopy(item.code, item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  copiedId === item.id
                    ? 'bg-emerald-500 text-slate-950 scale-105'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>

            {/* Code Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-amber-300/90 select-all overflow-x-auto whitespace-pre leading-relaxed tracking-wider">
              {item.code}
            </div>

            {/* Warning Callout if any */}
            {item.warning && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Nota técnica:</strong> {item.warning}
                </span>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};
