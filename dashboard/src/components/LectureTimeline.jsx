import {
  BookOpen,
  Brain,
  Camera,
  Circle,
  Mic,
  Sparkles,
} from 'lucide-react';
import { TIMELINE_EVENTS, formatTime, LECTURE_META } from '../data/mockLecture';

const TYPE_CONFIG = {
  start: { icon: Circle, color: 'text-airnote-muted', size: 'w-2 h-2' },
  speech: { icon: Mic, color: 'text-airnote-cyan', size: 'w-3 h-3' },
  board: { icon: Camera, color: 'text-airnote-accent', size: 'w-3 h-3' },
  note: { icon: BookOpen, color: 'text-airnote-phi', size: 'w-3 h-3' },
  concept: { icon: Brain, color: 'text-airnote-amber', size: 'w-3 h-3' },
  flashcard: { icon: Sparkles, color: 'text-yellow-400', size: 'w-3 h-3' },
};

export default function LectureTimeline({
  currentTime,
  selectedEventId,
  onSelectEvent,
  onSeek,
}) {
  const progress = (currentTime / LECTURE_META.totalDuration) * 100;

  return (
    <div className="panel flex flex-col h-full">
      <div className="px-3 py-2 border-b border-airnote-border">
        <p className="tech-label">Lecture Timeline</p>
        <p className="font-mono text-[10px] text-airnote-muted mt-0.5">Temporal alignment</p>
      </div>

      <div className="px-3 py-3 border-b border-airnote-border/50">
        <div className="relative h-6 mb-1">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-airnote-border" />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-px bg-airnote-accent/60 left-0 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          {TIMELINE_EVENTS.filter((e) => e.type !== 'start').map((evt) => {
            const pct = (evt.timestamp / LECTURE_META.totalDuration) * 100;
            const cfg = TYPE_CONFIG[evt.type] ?? TYPE_CONFIG.speech;
            const Icon = cfg.icon;
            return (
              <button
                key={evt.id}
                type="button"
                title={`${formatTime(evt.timestamp)} — ${evt.label}`}
                onClick={() => onSelectEvent(evt)}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-transform hover:scale-125 ${
                  selectedEventId === evt.id ? 'scale-125' : ''
                }`}
                style={{ left: `${pct}%` }}
              >
                <Icon className={`${cfg.size} ${cfg.color} ${evt.isLive ? 'animate-pulse-soft' : ''}`} />
              </button>
            );
          })}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-airnote-accent -translate-x-1/2 transition-all duration-300"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[9px] text-airnote-muted tabular-nums">
          <span>00:00</span>
          <span>{formatTime(LECTURE_META.totalDuration)}</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto min-h-0">
        {TIMELINE_EVENTS.map((evt) => {
          const cfg = TYPE_CONFIG[evt.type] ?? TYPE_CONFIG.speech;
          const Icon = cfg.icon;
          const isSelected = selectedEventId === evt.id;
          const isPast = evt.timestamp <= currentTime;

          return (
            <button
              key={evt.id}
              type="button"
              onClick={() => onSelectEvent(evt)}
              className={`w-full text-left px-3 py-2 border-b border-airnote-border/30 transition-colors ${
                isSelected
                  ? 'bg-airnote-accent/10 border-l-2 border-l-airnote-accent'
                  : 'hover:bg-airnote-surface/50 border-l-2 border-l-transparent'
              } ${!isPast && !evt.isLive ? 'opacity-40' : ''}`}
            >
              <div className="flex items-start gap-2">
                <Icon className={`${cfg.size} ${cfg.color} mt-0.5 shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-airnote-muted tabular-nums">
                      {formatTime(evt.timestamp)}
                    </span>
                    {evt.isChange && (
                      <span className="font-mono text-[8px] text-airnote-accent">CHANGE</span>
                    )}
                    {evt.isLive && (
                      <span className="font-mono text-[8px] text-airnote-live">LIVE</span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-airnote-text truncate mt-0.5">{evt.label}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-3 py-2 border-t border-airnote-border">
        <input
          type="range"
          min={0}
          max={LECTURE_META.totalDuration}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full h-1 appearance-none bg-airnote-border rounded cursor-pointer accent-airnote-accent"
        />
      </div>
    </div>
  );
}
