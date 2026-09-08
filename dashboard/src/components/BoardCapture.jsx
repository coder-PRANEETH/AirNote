const BOARD_SVGS = {
  'tcp-overview': (
    <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" fill="#1a2332" />
      <text x="20" y="35" fill="#8fa8bc" fontFamily="monospace" fontSize="14">TCP — Transmission Control Protocol</text>
      <text x="20" y="65" fill="#c8d4e0" fontFamily="monospace" fontSize="12">• Reliable, connection-oriented</text>
      <text x="20" y="90" fill="#c8d4e0" fontFamily="monospace" fontSize="12">• Full-duplex byte stream</text>
      <text x="20" y="115" fill="#c8d4e0" fontFamily="monospace" fontSize="12">• Flow control + congestion control</text>
      <rect x="20" y="140" width="360" height="70" fill="none" stroke="#00d4aa" strokeWidth="1" strokeDasharray="4" />
      <text x="30" y="165" fill="#00d4aa" fontFamily="monospace" fontSize="11">Connection setup: 3-way handshake</text>
      <text x="30" y="185" fill="#f5a623" fontFamily="monospace" fontSize="11">SYN → SYN-ACK → ACK</text>
    </svg>
  ),
  'tcp-handshake': (
    <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" fill="#1a2332" />
      <text x="20" y="30" fill="#00d4aa" fontFamily="monospace" fontSize="13">Three-Way Handshake</text>
      <line x1="80" y1="60" x2="80" y2="200" stroke="#5a6b7d" strokeWidth="1" />
      <line x1="320" y1="60" x2="320" y2="200" stroke="#5a6b7d" strokeWidth="1" />
      <text x="60" y="55" fill="#c8d4e0" fontFamily="monospace" fontSize="11">Client</text>
      <text x="300" y="55" fill="#c8d4e0" fontFamily="monospace" fontSize="11">Server</text>
      <line x1="80" y1="90" x2="320" y2="110" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="170" y="88" fill="#38bdf8" fontFamily="monospace" fontSize="10">SYN seq=x</text>
      <line x1="320" y1="130" x2="80" y2="150" stroke="#f5a623" strokeWidth="1.5" />
      <text x="155" y="128" fill="#f5a623" fontFamily="monospace" fontSize="10">SYN-ACK seq=y</text>
      <line x1="80" y1="170" x2="320" y2="190" stroke="#00d4aa" strokeWidth="1.5" />
      <text x="175" y="168" fill="#00d4aa" fontFamily="monospace" fontSize="10">ACK</text>
    </svg>
  ),
  'tcp-sequence': (
    <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" fill="#1a2332" />
      <text x="20" y="30" fill="#00d4aa" fontFamily="monospace" fontSize="13">SYN → SYN-ACK → ACK</text>
      <rect x="30" y="55" width="90" height="40" fill="#0d1219" stroke="#38bdf8" strokeWidth="1" />
      <text x="45" y="80" fill="#38bdf8" fontFamily="monospace" fontSize="12">SYN</text>
      <text x="140" y="80" fill="#5a6b7d" fontFamily="monospace" fontSize="16">→</text>
      <rect x="170" y="55" width="90" height="40" fill="#0d1219" stroke="#f5a623" strokeWidth="1" />
      <text x="175" y="80" fill="#f5a623" fontFamily="monospace" fontSize="11">SYN-ACK</text>
      <text x="280" y="80" fill="#5a6b7d" fontFamily="monospace" fontSize="16">→</text>
      <rect x="310" y="55" width="60" height="40" fill="#0d1219" stroke="#00d4aa" strokeWidth="1" />
      <text x="325" y="80" fill="#00d4aa" fontFamily="monospace" fontSize="12">ACK</text>
      <text x="20" y="140" fill="#c8d4e0" fontFamily="monospace" fontSize="11">Both sides synchronized</text>
      <text x="20" y="165" fill="#8fa8bc" fontFamily="monospace" fontSize="10">State: ESTABLISHED</text>
      <rect x="20" y="185" width="360" height="1" fill="#1e2a3a" />
      <text x="20" y="210" fill="#a78bfa" fontFamily="monospace" fontSize="10">seq numbers agreed: x, y</text>
    </svg>
  ),
  'tcp-seqnums': (
    <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" fill="#1a2332" />
      <text x="20" y="30" fill="#00d4aa" fontFamily="monospace" fontSize="13">Sequence Numbers</text>
      <text x="20" y="60" fill="#c8d4e0" fontFamily="monospace" fontSize="11">Client ISN = 1000</text>
      <text x="20" y="82" fill="#c8d4e0" fontFamily="monospace" fontSize="11">Server ISN = 5000</text>
      <rect x="20" y="100" width="360" height="50" fill="#0d1219" stroke="#1e2a3a" />
      <text x="30" y="122" fill="#38bdf8" fontFamily="monospace" fontSize="10">SYN  seq=1000</text>
      <text x="30" y="140" fill="#f5a623" fontFamily="monospace" fontSize="10">SYN-ACK seq=5000 ack=1001</text>
      <text x="20" y="185" fill="#8fa8bc" fontFamily="monospace" fontSize="10">ACK ack=5001 → connection open</text>
    </svg>
  ),
  'tcp-states': (
    <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" fill="#1a2332" />
      <text x="20" y="30" fill="#00d4aa" fontFamily="monospace" fontSize="13">Connection State Diagram</text>
      {[
        { x: 30, y: 60, label: 'CLOSED', color: '#5a6b7d' },
        { x: 130, y: 60, label: 'SYN-SENT', color: '#38bdf8' },
        { x: 250, y: 60, label: 'ESTABLISHED', color: '#00d4aa' },
        { x: 130, y: 140, label: 'SYN-RCVD', color: '#f5a623' },
      ].map(({ x, y, label, color }) => (
        <g key={label}>
          <rect x={x} y={y} width={label.length * 9 + 20} height="28" fill="#0d1219" stroke={color} strokeWidth="1" />
          <text x={x + 10} y={y + 18} fill={color} fontFamily="monospace" fontSize="10">{label}</text>
        </g>
      ))}
      <line x1="100" y1="74" x2="130" y2="74" stroke="#5a6b7d" strokeWidth="1" />
      <line x1="210" y1="74" x2="250" y2="74" stroke="#5a6b7d" strokeWidth="1" />
      <line x1="165" y1="88" x2="165" y2="140" stroke="#5a6b7d" strokeWidth="1" />
    </svg>
  ),
};

export default function BoardCapture({ board, flash, onBoardRefClick }) {
  if (!board) return null;

  const svg = BOARD_SVGS[board.content] ?? BOARD_SVGS['tcp-handshake'];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-airnote-border">
        <div>
          <p className="tech-label">Live Board</p>
          <h2 className="font-mono text-xs text-white mt-0.5">{board.title}</h2>
        </div>
        {flash && (
          <span className="font-mono text-[9px] text-airnote-accent animate-fade-in px-2 py-0.5 border border-airnote-accent/40">
            BOARD CHANGE DETECTED
          </span>
        )}
      </div>

      <div className="flex-1 relative p-3 min-h-0">
        <div
          className={`relative h-full border border-airnote-border bg-airnote-bg overflow-hidden transition-all duration-300 ${
            flash ? 'animate-board-flash' : ''
          }`}
        >
          <div className="absolute inset-0 bg-grid bg-grid opacity-30 pointer-events-none" />
          <div key={board.id} className="relative h-full flex items-center justify-center p-2 animate-fade-in">
            {svg}
          </div>

          {flash && (
            <div className="absolute inset-0 border-2 border-airnote-accent/50 pointer-events-none animate-board-flash" />
          )}

          <div className="absolute top-0 left-0 right-0 h-px bg-airnote-accent/20 animate-scan pointer-events-none" />
        </div>
      </div>

      <div className="px-3 py-2 border-t border-airnote-border flex items-center justify-between bg-airnote-surface/50">
        <div className="flex items-center gap-3 font-mono text-[9px]">
          <span className="tech-label">Board Capture</span>
          <span className="text-white tabular-nums">{board.label}</span>
          <span className="text-airnote-muted">YOLOv8-NANO</span>
          <span className="text-airnote-accent">CONF {(board.confidence * 100).toFixed(0)}%</span>
        </div>
        <button
          type="button"
          onClick={() => onBoardRefClick?.(board.timestamp)}
          className="font-mono text-[9px] text-airnote-cyan hover:text-airnote-accent transition-colors"
        >
          SYNC TIMELINE ↗
        </button>
      </div>
    </div>
  );
}
