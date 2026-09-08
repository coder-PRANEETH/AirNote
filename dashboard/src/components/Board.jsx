import { formatClock } from '../formatClock.js'

const ERASE_SEC = 0.7 // old writing fading away
const WRITE_SEC = 0.6 // new writing appearing

function BlockArrow() {
  // A plain force diagram: a mass with an arrow pushing it.
  return (
    <svg className="diagram" viewBox="0 0 300 110" role="img" aria-label="Block with force arrow">
      <rect x="4" y="14" width="82" height="82" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="45" y="62" textAnchor="middle" fontSize="24" fill="currentColor">m</text>
      <line x1="86" y1="55" x2="210" y2="55" stroke="currentColor" strokeWidth="2" />
      <path d="M 210 55 l -16 -8 l 0 16 z" fill="currentColor" />
      <text x="228" y="64" fontSize="24" fill="currentColor">F</text>
    </svg>
  )
}

function Line({ line }) {
  if (line.kind === 'heading') return <h3 className="board-heading">{line.text}</h3>
  if (line.kind === 'equation') return <p className="board-equation">{line.text}</p>
  return <BlockArrow />
}

// The board shows the latest writing for the current time. When a state is
// marked `erased`, the previous writing visibly clears before the new one
// is written — derived from the timeline position so scrubbing shows it too.
export default function Board({ states, time }) {
  let index = -1
  for (let i = 0; i < states.length; i += 1) {
    if (time >= states[i].t) index = i
  }

  const current = index >= 0 ? states[index] : null
  const previous = index > 0 ? states[index - 1] : null
  const since = current ? time - current.t : 0

  // During an erase, keep painting the previous writing while it fades.
  const erasing = current?.erased && previous && since < ERASE_SEC
  const visible = erasing ? previous : current
  const wiped = current?.erased && since < ERASE_SEC + WRITE_SEC

  let phase = 'steady'
  if (erasing) phase = 'erasing'
  else if (wiped) phase = 'writing'

  // Lines carried over from the previous state are already on the board;
  // only genuinely new lines animate in.
  const carried = !current?.erased && previous ? previous.lines.length : 0

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Board</h2>
        <span className="panel-note">writing</span>
      </div>

      <div className="panel-body">
        {!visible && <p className="empty">Nothing written yet</p>}

        {visible && (
          <>
            <time className="stamp">{formatClock(visible.t)}</time>
            <div className={`board-surface is-${phase}`} key={erasing ? 'erase' : visible.t}>
              {visible.lines.map((line, i) => (
                <div
                  key={`${line.kind}-${line.text}-${i}`}
                  className={i < carried ? 'board-line' : 'board-line is-new'}
                  style={i >= carried ? { animationDelay: `${(i - carried) * 0.18}s` } : undefined}
                >
                  <Line line={line} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
