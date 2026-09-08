import {
  BOARD_CAPTURES,
  NOTE_SECTIONS,
  SPEECH_SEGMENTS,
} from '../data/mockLecture';
import BoardCapture from './BoardCapture';

export default function LectureMemory({ currentTime, onSeek, onSelectBoard }) {
  const memoryBlocks = BOARD_CAPTURES.map((board) => {
    const speech = SPEECH_SEGMENTS.find((s) => s.boardId === board.id);
    const note = NOTE_SECTIONS.find((n) => n.boardRef === board.id);
    return { board, speech, note };
  }).filter((b) => b.board.timestamp <= currentTime);

  return (
    <div className="flex-1 overflow-auto p-4 min-h-0 bg-grid bg-grid">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <p className="tech-label">Lecture Memory</p>
          <h2 className="font-mono text-lg text-white mt-1">Chronological Reconstruction</h2>
          <p className="font-mono text-[10px] text-airnote-muted mt-1">
            Timestamp → Board → Explanation → Notes → Key Concept
          </p>
        </div>

        {memoryBlocks.map(({ board, speech, note }, idx) => (
          <article
            key={board.id}
            className="panel overflow-hidden animate-slide-up"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <button
              type="button"
              onClick={() => onSeek(board.timestamp)}
              className="w-full text-left px-4 py-2 border-b border-airnote-border bg-airnote-surface/50 hover:bg-airnote-accent/5 transition-colors"
            >
              <span className="font-mono text-xs text-airnote-accent tabular-nums">{board.label}</span>
              <span className="font-mono text-[10px] text-airnote-muted ml-3">{board.title}</span>
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="border-r border-airnote-border min-h-[180px]">
                <BoardCapture
                  board={board}
                  flash={false}
                  onBoardRefClick={onSelectBoard}
                />
              </div>

              <div className="p-4 space-y-4">
                {speech && (
                  <section>
                    <p className="tech-label mb-1">Teacher Explanation</p>
                    <p className="font-mono text-[10px] text-airnote-cyan mb-1">{speech.speaker}</p>
                    <p className="text-sm text-airnote-text/90 leading-relaxed border-l-2 border-airnote-cyan/30 pl-3">
                      &ldquo;{speech.text}&rdquo;
                    </p>
                  </section>
                )}

                {note && (
                  <section>
                    <p className="tech-label mb-1">Generated Notes</p>
                    <h4 className="font-mono text-xs text-white">{note.title}</h4>
                    <p className="text-sm text-airnote-text/80 mt-1">{note.preview}</p>
                  </section>
                )}

                <section>
                  <p className="tech-label mb-1">Metadata</p>
                  <div className="flex flex-wrap gap-2 font-mono text-[9px]">
                    <span className="px-2 py-0.5 border border-airnote-border text-airnote-muted">
                      YOLOv8 · {(board.confidence * 100).toFixed(0)}%
                    </span>
                    <span className="px-2 py-0.5 border border-airnote-border text-airnote-muted">
                      Whisper · {speech?.label ?? '—'}
                    </span>
                    <span className="px-2 py-0.5 border border-airnote-accent/30 text-airnote-accent">
                      Phi-3 · synced
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </article>
        ))}

        {memoryBlocks.length === 0 && (
          <p className="font-mono text-sm text-airnote-muted text-center py-12">
            No lecture memory captured yet. Scrub the timeline to explore.
          </p>
        )}
      </div>
    </div>
  );
}
