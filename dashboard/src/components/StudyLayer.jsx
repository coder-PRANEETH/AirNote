import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FLASHCARDS, formatTime, getBoardById } from '../data/mockLecture';

export default function StudyLayer({
  open,
  onClose,
  activeIndex,
  setActiveIndex,
  revealedCards,
  toggleReveal,
  onSeekToTimestamp,
}) {
  if (!open) return null;

  const card = FLASHCARDS[activeIndex];
  const revealed = revealedCards.has(card.id);
  const board = getBoardById(card.boardRef);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="panel w-full max-w-lg mx-4 shadow-2xl border-airnote-accent/20">
        <div className="flex items-center justify-between px-4 py-3 border-b border-airnote-border">
          <div>
            <p className="tech-label">Study Layer</p>
            <h2 className="font-mono text-sm text-white mt-0.5">AIRNOTE STUDY</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-airnote-muted hover:text-white transition-colors"
            aria-label="Close study layer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 min-h-[280px] flex flex-col">
          <div
            className={`flex-1 border-2 border-dashed p-6 flex flex-col justify-center transition-all duration-300 ${
              revealed
                ? 'border-airnote-accent/30 bg-airnote-accent/5'
                : 'border-airnote-border bg-airnote-bg/60'
            }`}
            style={{
              backgroundImage: revealed
                ? 'none'
                : 'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(30,42,58,0.3) 28px)',
            }}
          >
            {!revealed ? (
              <>
                <p className="font-sans text-base text-airnote-text leading-relaxed mb-6">
                  {card.question}
                </p>
                <button
                  type="button"
                  onClick={() => toggleReveal(card.id)}
                  className="self-center px-6 py-2 font-mono text-[11px] tracking-[0.2em] border border-airnote-accent/50 text-airnote-accent hover:bg-airnote-accent/10 transition-colors"
                >
                  REVEAL
                </button>
              </>
            ) : (
              <div className="animate-slide-up">
                <p className="font-mono text-[10px] text-airnote-muted mb-2">ANSWER</p>
                <p className="font-sans text-sm text-airnote-text leading-relaxed">{card.answer}</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[9px] text-airnote-muted">
            <button
              type="button"
              onClick={() => board && onSeekToTimestamp(board.timestamp)}
              className="text-airnote-cyan hover:text-airnote-accent transition-colors"
            >
              Source · {formatTime(card.timestamp)}
              {board ? ` · ${board.title}` : ''}
            </button>
            <span>
              {activeIndex + 1} / {FLASHCARDS.length}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-airnote-border">
          <button
            type="button"
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            className="flex items-center gap-1 font-mono text-[10px] text-airnote-muted hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> PREV
          </button>
          <button
            type="button"
            onClick={() => toggleReveal(card.id)}
            className="font-mono text-[10px] text-airnote-accent tracking-wider"
          >
            {revealed ? 'HIDE' : 'REVEAL'}
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((i) => Math.min(FLASHCARDS.length - 1, i + 1))}
            disabled={activeIndex === FLASHCARDS.length - 1}
            className="flex items-center gap-1 font-mono text-[10px] text-airnote-muted hover:text-white disabled:opacity-30 transition-colors"
          >
            NEXT <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
