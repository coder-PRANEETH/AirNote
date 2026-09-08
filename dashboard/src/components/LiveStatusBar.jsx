import { formatTime } from '../data/mockLecture';

const INDICATORS = [
  { key: 'camera', label: 'CAMERA', sub: 'BOARD STREAM', status: 'ACTIVE', active: true },
  { key: 'mic', label: 'MIC', sub: 'WHISPER', status: 'PROCESSING', active: true },
  { key: 'npu', label: 'NPU', sub: 'PHI-3', status: 'READY', active: true },
  { key: 'sync', label: 'OFFICE KIT', sub: 'SYNC', status: 'CONNECTED', active: true },
];

export default function LiveStatusBar({ currentTime }) {
  return (
    <div className="flex items-center justify-between px-4 py-1.5 border-b border-airnote-border bg-airnote-bg/60 shrink-0">
      <div className="flex items-center gap-1">
        <span className="tech-label mr-2">AIRNOTE</span>
        <span className="font-mono text-[10px] text-airnote-live tracking-wider">LIVE</span>
        <span className="font-mono text-[10px] text-airnote-muted mx-1">·</span>
        <span className="font-mono text-[11px] text-white tabular-nums">{formatTime(currentTime)}</span>
      </div>

      <div className="hidden sm:flex items-center gap-4 lg:gap-6">
        {INDICATORS.map(({ key, label, sub, status, active }) => (
          <div key={key} className="instrument-row">
            <span className={`status-dot ${active ? 'status-dot-active' : 'bg-airnote-muted'}`} />
            <span className="text-airnote-muted">{label}</span>
            <span className="text-airnote-border">│</span>
            <span className="text-airnote-text/70">{sub}</span>
            <span className="text-airnote-accent text-[10px]">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
