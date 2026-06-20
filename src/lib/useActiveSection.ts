import { useEffect, useState } from 'react'

/** Tracks which section id is most in view (for the progress rail). */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.35, 0.6], rootMargin: '-20% 0px -20% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}
