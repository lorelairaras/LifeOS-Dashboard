import { useState, useCallback, useEffect } from 'react'

// "Motion effects" = decorative ambient motion (the bat flock, cursor effects).
// Default ON, but ALWAYS yields to prefers-reduced-motion. Persisted in localStorage
// so the user's choice sticks; falls back to an in-memory value if storage is blocked.
const KEY = 'lifeos:motion-effects'
const EVENT = 'lifeos:motion-effects-changed'

let memoryValue: boolean | null = null

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function readPref(): boolean {
  try {
    const v = localStorage.getItem(KEY)
    if (v === null) return true // default ON
    return v === '1'
  } catch {
    return memoryValue ?? true
  }
}

/**
 * Returns `{ enabled, toggle }`.
 * `enabled` is the user's preference AND-ed with "not reduced motion" — so motion
 * effects never play when the OS asks for reduced motion, regardless of the toggle.
 * `userPref` exposes the raw toggle state for the Settings switch.
 */
export function useMotionEffects() {
  const [userPref, setUserPref] = useState(readPref)
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    const sync = () => setUserPref(readPref())
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)

    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
      mq.removeEventListener('change', onChange)
    }
  }, [])

  const toggle = useCallback(() => {
    const next = !readPref()
    memoryValue = next
    try {
      localStorage.setItem(KEY, next ? '1' : '0')
    } catch {
      // storage unavailable — memoryValue keeps the session consistent
    }
    window.dispatchEvent(new Event(EVENT))
    setUserPref(next)
  }, [])

  return { enabled: userPref && !reduced, userPref, reduced, toggle }
}
