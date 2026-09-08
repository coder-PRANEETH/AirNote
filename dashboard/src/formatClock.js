// The lecture clock starts at 10:00; every `t` in the JSON is seconds past that.
const CLOCK_BASE_MINUTES = 10 * 60

export function formatClock(t) {
  const total = CLOCK_BASE_MINUTES + Math.floor(t)
  const h = Math.floor(total / 60)
  const m = total % 60
  return `${h}:${String(m).padStart(2, '0')}`
}
