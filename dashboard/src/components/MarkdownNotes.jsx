import ReactMarkdown from 'react-markdown';
import { NOTES_MARKDOWN, getBoardById } from '../data/mockLecture';

export default function MarkdownNotes({ phiGenerating, activeBoard, onBoardRefClick, highlightTime }) {
  const processed = NOTES_MARKDOWN.replace(
    /!\[Board Capture[^\]]*\]\(#([^)]+)\)/g,
    (_, boardId) => {
      const board = getBoardById(boardId);
      return board
        ? `\n\n> 📷 **Visual ref** — diagram captured at **${board.label}** · [view board](#board-ref-${boardId})\n\n`
        : '';
    },
  ).replace(
    /captured at \*\*(\d{2}:\d{2})\*\*/g,
    (match, time) =>
      `[${match}](#time-${time.replace(':', '')})`,
  );

  const components = {
    a: ({ href, children }) => {
      if (href?.startsWith('#board-ref-')) {
        const boardId = href.replace('#board-ref-', '');
        const board = getBoardById(boardId);
        return (
          <button
            type="button"
            onClick={() => board && onBoardRefClick?.(board.timestamp)}
            className="inline-flex items-center gap-1 font-mono text-[10px] text-airnote-cyan hover:text-airnote-accent border border-airnote-cyan/30 px-1.5 py-0.5 transition-colors"
          >
            {children}
          </button>
        );
      }
      if (href?.startsWith('#time-')) {
        const t = href.replace('#time-', '');
        const [m, s] = [t.slice(0, 2), t.slice(2)];
        const seconds = parseInt(m, 10) * 60 + parseInt(s, 10);
        return (
          <button
            type="button"
            onClick={() => onBoardRefClick?.(seconds)}
            className="text-airnote-cyan hover:text-airnote-accent underline underline-offset-2 decoration-airnote-cyan/40"
          >
            {children}
          </button>
        );
      }
      return <a href={href}>{children}</a>;
    },
    h1: ({ children }) => (
      <h1 className="font-mono text-base font-semibold text-white mb-3 pb-2 border-b border-airnote-border">{children}</h1>
    ),
    h3: ({ children }) => (
      <h3 className="font-mono text-xs text-airnote-accent mt-4 mb-2 tracking-wide">{children}</h3>
    ),
    p: ({ children }) => <p className="text-sm text-airnote-text/90 leading-relaxed mb-2">{children}</p>,
    li: ({ children }) => <li className="text-sm text-airnote-text/90 ml-4 mb-1 list-decimal">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-airnote-phi/50 pl-3 my-3 text-sm text-airnote-text/80 italic bg-airnote-phi/5 py-2">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-airnote-border my-4" />,
    em: ({ children }) => <em className="text-airnote-accent not-italic font-medium">{children}</em>,
    strong: ({ children }) => <strong className="text-white font-medium">{children}</strong>,
  };

  return (
    <div className="panel flex flex-col h-full">
      <div className="px-3 py-2 border-b border-airnote-border flex items-center justify-between shrink-0">
        <div>
          <p className="tech-label">Live Notes</p>
          <p className="font-mono text-[10px] text-airnote-muted mt-0.5">VS Code / Obsidian sync</p>
        </div>
        <div className="flex items-center gap-2">
          {phiGenerating && (
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-airnote-phi">
              <span className="status-dot bg-airnote-phi animate-pulse-soft" />
              PHI-3 GENERATING
            </span>
          )}
          {activeBoard && (
            <span className="font-mono text-[9px] text-airnote-muted hidden lg:inline">
              sync · {activeBoard.label}
            </span>
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-auto p-4 min-h-0 prose-sm animate-fade-in"
        data-highlight-time={highlightTime}
      >
        <ReactMarkdown components={components}>{processed}</ReactMarkdown>
      </div>

      <div className="px-3 py-1.5 border-t border-airnote-border bg-airnote-bg/40 shrink-0">
        <p className="font-mono text-[9px] text-airnote-muted">
          Markdown · auto-linked to board captures · export ready
        </p>
      </div>
    </div>
  );
}
