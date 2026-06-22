import { useEffect, useState } from 'react'

/** Two ways to experience the lab:
 *  - 'app'  → phone-native dashboard (tiles + bottom tabs), default on phones / installed app
 *  - 'tour' → the immersive scroll site, default on desktop
 *  The choice is remembered; either shell can flip it. */
export type Mode = 'app' | 'tour'

const KEY = 'vl_mode'
const EVT = 'vl_mode_change'

function detectDefault(): Mode {
  if (typeof window === 'undefined') return 'tour'
  const w = window as unknown as { Capacitor?: { isNativePlatform?: () => boolean }; navigator: Navigator & { standalone?: boolean } }
  const native = w.Capacitor?.isNativePlatform?.() === true
  const standalone = window.matchMedia('(display-mode: standalone)').matches || w.navigator.standalone === true
  const phone = window.matchMedia('(max-width: 768px)').matches
  return native || standalone || phone ? 'app' : 'tour'
}

export function getMode(): Mode {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'app' || saved === 'tour') return saved
  } catch { /* ignore */ }
  return detectDefault()
}

export function setMode(m: Mode) {
  try { localStorage.setItem(KEY, m) } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent(EVT, { detail: m }))
}

/** Subscribe to the active mode. setMode (returned) flips it everywhere. */
export function useMode(): [Mode, (m: Mode) => void] {
  const [mode, set] = useState<Mode>(() => getMode())
  useEffect(() => {
    const on = () => set(getMode())
    window.addEventListener(EVT, on)
    return () => window.removeEventListener(EVT, on)
  }, [])
  return [mode, setMode]
}
