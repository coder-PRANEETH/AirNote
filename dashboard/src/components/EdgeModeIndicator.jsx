import { WifiOff } from 'lucide-react';

export default function EdgeModeIndicator() {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 border border-airnote-accent/20 bg-airnote-accent/[0.03]">
      <WifiOff className="w-3 h-3 text-airnote-accent" />
      <div>
        <p className="font-mono text-[9px] text-airnote-accent tracking-[0.12em]">EDGE MODE</p>
        <p className="font-mono text-[8px] text-airnote-muted tracking-wider">NO INTERNET REQUIRED</p>
      </div>
      <span className="status-dot status-dot-active ml-1" />
    </div>
  );
}
