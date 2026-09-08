import WaveformVisualizer from './WaveformVisualizer';

export default function LiveTranscript({ speech }) {
  const isLive = speech?.isLive;

  return (
    <div className="panel flex flex-col h-full">
      <div className="px-3 py-2 border-b border-airnote-border flex items-center justify-between">
        <div>
          <p className="tech-label">Whisper Tiny</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`status-dot ${isLive ? 'status-dot-active' : 'bg-airnote-muted'}`} />
            <span className="font-mono text-[10px] text-airnote-accent tracking-wider">
              {isLive ? 'LISTENING' : 'CAPTURED'}
            </span>
          </div>
        </div>
        {speech?.label && (
          <span className="font-mono text-[10px] text-airnote-muted tabular-nums">{speech.label}</span>
        )}
      </div>

      <div className="px-3 py-2 border-b border-airnote-border/50">
        <WaveformVisualizer active={isLive} />
      </div>

      <div className="flex-1 p-3 overflow-auto min-h-0">
        <div className="animate-slide-up" key={speech?.id}>
          <p className="font-mono text-[10px] text-airnote-cyan mb-2 tracking-wider">
            {speech?.speaker ?? 'Professor'}:
          </p>
          <p className="font-sans text-sm text-airnote-text leading-relaxed border-l-2 border-airnote-accent/30 pl-3">
            &ldquo;{speech?.text}&rdquo;
          </p>
        </div>

        {speech?.boardId && (
          <p className="mt-3 font-mono text-[9px] text-airnote-muted">
            ↳ aligned with board capture · {speech.label}
          </p>
        )}
      </div>
    </div>
  );
}
