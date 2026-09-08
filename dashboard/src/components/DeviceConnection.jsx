import { Battery, Cpu, Mic, Video } from 'lucide-react';
import { DEVICE_STATUS } from '../data/mockLecture';
import EdgeModeIndicator from './EdgeModeIndicator';

const STATUS_COLOR = {
  streaming: 'text-airnote-accent',
  processing: 'text-airnote-amber',
  active: 'text-airnote-cyan',
};

export default function DeviceConnection() {
  const { model, battery, camera, microphone, npu, connected } = DEVICE_STATUS;

  return (
    <div className="panel p-3 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="tech-label">Edge Device</p>
          <h3 className="font-mono text-xs font-semibold text-white mt-0.5">iQOO</h3>
          <p className="font-mono text-[10px] text-airnote-muted">{model}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <span className={`status-dot ${connected ? 'status-dot-active' : 'bg-airnote-muted'}`} />
            <span className="font-mono text-[10px] text-airnote-accent tracking-wider">
              {connected ? 'CONNECTED' : 'OFFLINE'}
            </span>
          </div>
          <p className="font-mono text-[10px] text-airnote-muted mt-1">AIRNOTE DEVICE</p>
        </div>
      </div>

      <div className="space-y-2 border-t border-airnote-border pt-2">
        {[
          { icon: Video, label: 'Camera', status: camera.status, detail: camera.label },
          { icon: Mic, label: 'Microphone', status: microphone.status, detail: microphone.label },
          { icon: Cpu, label: 'NPU', status: npu.status, detail: npu.label },
        ].map(({ icon: Icon, label, status, detail }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-3 h-3 text-airnote-muted" />
              <span className="font-mono text-[10px] text-airnote-text">{label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-airnote-muted hidden xl:inline">{detail}</span>
              <span className={`status-dot ${status === 'streaming' || status === 'processing' ? 'status-dot-active' : 'bg-airnote-cyan'}`} />
              <span className={`font-mono text-[9px] uppercase tracking-wider ${STATUS_COLOR[status] ?? 'text-airnote-muted'}`}>
                {status}
              </span>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Battery className="w-3 h-3 text-airnote-muted" />
            <span className="font-mono text-[10px] text-airnote-text">Battery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-airnote-border relative">
              <div
                className="absolute inset-y-0 left-0 bg-airnote-accent"
                style={{ width: `${battery}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-airnote-accent tabular-nums">{battery}%</span>
          </div>
        </div>
      </div>

      <EdgeModeIndicator />
    </div>
  );
}
