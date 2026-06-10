import { useState, useCallback, useEffect } from 'react'

// "Flavor names" = the gothic Rose Obsidian module names (The Grimoire,
// The Séance, …) shown as page-header subtitles. OFF by default so new
// users and stakeholders see plain English only.
const KEY = 'lifeos:flavor-names'
const EVENT = 'lifeos:flavor-names-changed'

// In-memory fallback so the toggle still works both ways when
// localStorage is blocked (e.g. strict private browsing).
let memoryValue: boolean | null = null

function read(): boolean {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return memoryValue ?? false
  }
}

export function useFlavorNames() {
  const [enabled, setEnabled] = useState(read)

  // Keep all subscribed components in sync when the toggle changes anywhere
  useEffect(() => {
    const sync = () => setEnabled(read())
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback(() => {
    const next = !read()
    memoryValue = next
    try {
      localStorage.setItem(KEY, next ? '1' : '0')
    } catch {
      // localStorage unavailable — memoryValue keeps the session consistent
    }
    window.dispatchEvent(new Event(EVENT))
    setEnabled(next)
  }, [])

  return { enabled, toggle }
}
