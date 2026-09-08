import { PROCESSING } from '../data/mockLecture';

const ORDER = ['vision', 'audio', 'synthesis', 'edge'];

export default function ProcessingMonitor() {
  return (
    <div className="panel p-3">
      <p className="tech-label mb-2">AI Processing Monitor</p>
      <div className="space-y-2">
        {ORDER.map((key) => {
          const { model, status, task } = PROCESSING[key];
          const label = key.toUpperCase();
          return (
            <div key={key} className="border border-airnote-border/50 px-2 py-1.5">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono text-[9px] text-airnote-muted tracking-wider">{label}</span>
                <div className="flex items-center gap-1">
                  <span className={`status-dot ${status === 'active' ? 'status-dot-active' : 'bg-airnote-muted'}`} />
                  <span className="font-mono text-[9px] text-airnote-accent uppercase">{status}</span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-white">{model}</p>
              <p className="font-mono text-[9px] text-airnote-muted">{task}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
