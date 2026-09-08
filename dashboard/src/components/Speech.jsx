import { formatClock } from '../formatClock.js'

// Speech entries appear one by one as the timeline reaches their timestamp.
// The most recent line stays at full strength; earlier ones recede.
export default function Speech({ entries, time }) {
  const shown = entries.filter((e) => time >= e.t)

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Speech</h2>
        <span className="panel-note">transcript</span>
      </div>

      <div className="panel-body">
        {shown.length === 0 && <p className="empty">Waiting for the lecture to start</p>}

        {shown.map((entry, i) => (
          <article
            key={entry.t}
            className={`speech-entry${i === shown.length - 1 ? ' is-current' : ''}`}
          >
            <time className="stamp">{formatClock(entry.t)}</time>
            <p className="speech-text">&ldquo;{entry.text}&rdquo;</p>
          </article>
        ))}
      </div>
    </section>
  )
}
