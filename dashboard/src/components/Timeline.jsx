import { useCallback, useEffect, useRef, useState } from 'react'
import { formatClock } from '../formatClock.js'

// A single horizontal track: play/pause, a draggable handle, and the clock.
// Ticks mark where speech and board events sit in the lecture.
export default function Timeline({
  time,
  duration,
  playing,
  speech,
  board,
  onTogglePlay,
  onSeek,
  onScrubChange,
}) {
  const trackRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const seekFromEvent = useCallback(
    (clientX) => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const ratio = (clientX - rect.left) / rect.width
      onSeek(Math.max(0, Math.min(1, ratio)) * duration)
    },
    [duration, onSeek],
  )

  const startDrag = (e) => {
    setDragging(true)
    onScrubChange(true)
    seekFromEvent(e.clientX)
  }

  useEffect(() => {
    if (!dragging) return undefined
    const move = (e) => seekFromEvent(e.clientX)
    const up = () => {
      setDragging(false)
      onScrubChange(false)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [dragging, seekFromEvent, onScrubChange])

  const percent = (time / duration) * 100

  return (
    <footer className="timeline">
      <button
        type="button"
        className="play"
        onClick={onTogglePlay}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="7" y="5" width="3.6" height="14" rx="1" fill="currentColor" />
            <rect x="13.4" y="5" width="3.6" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div
        className={`track${dragging ? ' is-dragging' : ''}`}
        ref={trackRef}
        onPointerDown={startDrag}
        role="slider"
        tabIndex={0}
        aria-label="Lecture timeline"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={Math.round(time)}
        aria-valuetext={formatClock(time)}
      >
        <div className="track-line" />
        <div className="track-fill" style={{ width: `${percent}%` }} />

        {board.map((b) => (
          <span key={`b-${b.t}`} className="tick tick-board" style={{ left: `${(b.t / duration) * 100}%` }} />
        ))}
        {speech.map((s) => (
          <span key={`s-${s.t}`} className="tick tick-speech" style={{ left: `${(s.t / duration) * 100}%` }} />
        ))}

        <span className="handle" style={{ left: `${percent}%` }} />
      </div>

      <time className="clock">{formatClock(time)}</time>
    </footer>
  )
}
