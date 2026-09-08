import { Mic, Camera, Brain, RefreshCw } from 'lucide-react';
import { PROCESSING } from '../data/mockLecture';

export default function BottomStatusRail() {
  const items = [
    { icon: Mic, label: 'MIC', sub: 'Whisper Tiny', key: 'audio' },
    { icon: Camera, label: 'BOARD', sub: 'YOLOv8', key: 'vision' },
    { icon: Brain, label: 'Phi-3', sub: 'Synthesis', key: 'synthesis' },
    { icon: RefreshCw, label: 'SYNC', sub: 'Office Kit', key: 'edge' },
  ];

  return (
    <footer className="shrink-0 border-t border-airnote-border bg-airnote-surface/90 px-4 py-2">
      <div className="flex items-center justify-between gap-4 overflow-x-auto">
        {items.map(({ icon: Icon, label, sub, key }) => {
          const proc = PROCESSING[key];
          return (
            <div key={key} className="flex items-center gap-2 instrument-row shrink-0">
              <Icon className="w-3 h-3 text-airnote-muted" />
              <span className="text-airnote-muted">{label}</span>
              <span className="text-airnote-border">●</span>
              <span className="text-airnote-text/80">{sub}</span>
              <span className={`status-dot ${proc?.status === 'active' ? 'status-dot-active' : 'bg-airnote-muted'}`} />
              <span className="text-airnote-accent text-[10px] uppercase hidden sm:inline">
                {proc?.status}
              </span>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
