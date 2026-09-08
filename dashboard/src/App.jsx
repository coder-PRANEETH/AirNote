import { useCallback, useEffect, useRef, useState } from 'react'
import lecture from './data/lecture.json'
import Speech from './components/Speech.jsx'
import Board from './components/Board.jsx'
import Timeline from './components/Timeline.jsx'
import './App.css'

function App() {
  const [time, setTime] = useState(16)
  const [playing, setPlaying] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)
  const rafRef = useRef(0)

  // Drive the clock from rAF timestamps so playback stays smooth and
  // independent of frame rate.
  useEffect(() => {
    if (!playing) return undefined

    let last = performance.now()
    const step = (now) => {
      const dt = (now - last) / 1000
      last = now
      setTime((prev) => {
        const next = prev + dt
        if (next >= lecture.duration) {
          setPlaying(false)
          return lecture.duration
        }
        return next
      })
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing])

  const togglePlay = useCallback(() => {
    setPlaying((p) => {
      // Restarting from the very end replays the lecture.
      if (!p && time >= lecture.duration) setTime(0)
      return !p
    })
  }, [time])

  const seek = useCallback((t) => {
    setTime(Math.max(0, Math.min(lecture.duration, t)))
  }, [])

  // Space toggles playback, arrows nudge the timeline.
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        setTime((t) => Math.max(0, t - 5))
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        setTime((t) => Math.min(lecture.duration, t + 5))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePlay])

  return (
    <div className="app">
      <header className="topbar">
        <span className="brand">Lecture Notes</span>
        <span className="lecture-title">{lecture.title}</span>
        <span className="mode">{scrubbing ? 'Reviewing' : playing ? 'Playing' : 'Paused'}</span>
      </header>

      <main className="panels">
        <Speech entries={lecture.speech} time={time} />
        <Board states={lecture.board} time={time} />
      </main>

      <Timeline
        time={time}
        duration={lecture.duration}
        playing={playing}
        speech={lecture.speech}
        board={lecture.board}
        onTogglePlay={togglePlay}
        onSeek={seek}
        onScrubChange={setScrubbing}
      />
    </div>
  )
}

export default App
