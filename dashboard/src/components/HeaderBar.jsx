import { Radio } from 'lucide-react';
import { formatTime } from '../data/mockLecture';

export default function HeaderBar({ currentTime, onOpenStudy, viewMode, setViewMode }) {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 border-b border-airnote-border bg-airnote-surface/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-airnote-accent/40 flex items-center justify-center">
            <span className="font-mono text-[10px] text-airnote-accent font-semibold">AN</span>
          </div>
          <div>
            <h1 className="font-mono text-sm font-semibold tracking-widest text-white">AIRNOTE AI</h1>
            <p className="tech-label">Lecture Command Center</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-airnote-live/30 bg-airnote-live/5">
          <Radio className="w-3 h-3 text-airnote-live animate-pulse-soft" />
          <span className="font-mono text-[11px] text-airnote-live font-medium tracking-wider">LIVE LECTURE</span>
          <span className="font-mono text-[11px] text-airnote-muted">•</span>
          <span className="font-mono text-[11px] text-white tabular-nums">{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1 mr-2">
          {[
            { id: 'workspace', label: 'WORKSPACE' },
            { id: 'memory', label: 'LECTURE MEMORY' },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setViewMode(id)}
              className={`px-3 py-1 font-mono text-[10px] tracking-wider border transition-colors ${
                viewMode === id
                  ? 'border-airnote-accent/50 text-airnote-accent bg-airnote-accent/5'
                  : 'border-airnote-border text-airnote-muted hover:text-airnote-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenStudy}
          className="px-3 py-1 font-mono text-[10px] tracking-wider border border-airnote-border text-airnote-muted hover:text-airnote-accent hover:border-airnote-accent/40 transition-colors"
        >
          STUDY LAYER
        </button>

        <div className="flex items-center gap-2 px-2.5 py-1 border border-airnote-border">
          <span className="status-dot status-dot-active" />
          <span className="font-mono text-[10px] text-airnote-accent tracking-wider">iQOO ●</span>
        </div>
      </div>
    </header>
  );
}
