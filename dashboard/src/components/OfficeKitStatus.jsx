import { OFFICE_KIT } from '../data/mockLecture';

const ITEMS = [
  { key: 'screenMirroring', label: 'SCREEN MIRRORING' },
  { key: 'fileTransfer', label: 'FILE TRANSFER' },
  { key: 'sharedClipboard', label: 'SHARED CLIPBOARD' },
];

const STATUS_LABEL = {
  connected: 'CONNECTED',
  ready: 'READY',
  active: 'ACTIVE',
};

export default function OfficeKitStatus() {
  return (
    <div className="panel p-3">
      <p className="tech-label mb-2">iQOO Office Kit</p>

      <div className="relative py-3 px-2 mb-3 border border-airnote-border/60 bg-airnote-bg/40">
        <div className="flex flex-col items-center gap-0 font-mono text-[9px] tracking-wider">
          <span className="text-airnote-cyan">iQOO PHONE</span>
          <div className="flex flex-col items-center py-1">
            <span className="text-airnote-accent animate-flow">│</span>
            <span className="text-airnote-muted text-[8px]">LIVE EDGE DATA</span>
            <span className="text-airnote-accent animate-flow" style={{ animationDelay: '0.3s' }}>▼</span>
          </div>
          <span className="text-white">AIRNOTE PROCESSING</span>
          <div className="flex flex-col items-center py-1">
            <span className="text-airnote-accent animate-flow" style={{ animationDelay: '0.6s' }}>│</span>
            <span className="text-airnote-muted text-[8px]">OFFICE KIT</span>
            <span className="text-airnote-accent animate-flow" style={{ animationDelay: '0.9s' }}>▼</span>
          </div>
          <span className="text-airnote-accent">LAPTOP NOTES</span>
        </div>
      </div>

      <div className="space-y-1.5">
        {ITEMS.map(({ key, label }) => {
          const status = OFFICE_KIT[key];
          return (
            <div key={key} className="flex items-center justify-between instrument-row">
              <span className="text-airnote-muted">{label}</span>
              <div className="flex items-center gap-1.5">
                <span className="status-dot status-dot-active" />
                <span className="text-airnote-accent text-[10px]">{STATUS_LABEL[status]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
