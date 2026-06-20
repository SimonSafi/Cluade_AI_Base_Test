import { useEffect, useRef } from 'react'

/** Perspective star tunnel: stars stream toward the camera as you scroll (warp while moving,
    gentle idle drift when still) + a few large "worlds" that loom and pass — a sense of
    flying through the void toward objects, then on to the next. */
export function SpaceFlight({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const css = getComputedStyle(document.documentElement)
    const hex = (v: string, f: string) => css.getPropertyValue(v).trim() || f
    const palette = [hex('--cyan', '#2fe6ff'), hex('--accent-2', '#a06bff'), hex('--teal', '#2dd4bf'), hex('--magenta', '#e879f9'), '#cfe8ff']

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, cx = 0, cy = 0, spread = 0, raf = 0
    let lastScroll = window.scrollY
    let boost = 0

    type Star = { x: number; y: number; z: number; pz: number; c: string }
    type World = { x: number; y: number; z: number; r: number; c: string }
    let stars: Star[] = []
    let worlds: World[] = []

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const build = () => {
      const n = Math.round(Math.min(220, (w * h) / 7000))
      stars = Array.from({ length: n }, () => {
        const z = rand(0.05, 1)
        return { x: rand(-1, 1), y: rand(-1, 1), z, pz: z, c: palette[(Math.random() * palette.length) | 0] }
      })
      worlds = Array.from({ length: 3 }, (_, i) => ({ x: rand(-0.7, 0.7), y: rand(-0.6, 0.6), z: 0.34 + i * 0.33, r: rand(0.5, 0.9), c: palette[i % 3] }))
    }
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width; h = r.height; cx = w / 2; cy = h / 2
      spread = Math.min(w, h) * 0.9
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }
    resize()

    const draw = () => {
      // forward speed: small idle drift + surge from scroll movement (decays)
      const sy = window.scrollY
      const delta = sy - lastScroll
      lastScroll = sy
      boost += Math.min(0.02, Math.abs(delta) * 0.00006)
      boost *= 0.92
      const vel = reduce ? 0 : 0.0016 + boost

      // trails: translucent clear for motion blur
      ctx.globalAlpha = 1
      ctx.fillStyle = 'rgba(3,4,10,0.34)'
      ctx.fillRect(0, 0, w, h)

      // worlds (large, far-back, approach + pass)
      for (const o of worlds) {
        o.z -= vel * 0.55
        if (o.z <= 0.08) { o.z = 1; o.x = rand(-0.7, 0.7); o.y = rand(-0.6, 0.6); o.r = rand(0.5, 0.95); o.c = palette[(Math.random() * 3) | 0] }
        const sx = cx + (o.x / o.z) * spread
        const syy = cy + (o.y / o.z) * spread
        const rad = (o.r / o.z) * spread * 0.12
        if (rad < 2) continue
        const g = ctx.createRadialGradient(sx, syy, 0, sx, syy, rad)
        g.addColorStop(0, o.c + 'aa')
        g.addColorStop(0.5, o.c + '2e')
        g.addColorStop(1, o.c + '00')
        ctx.globalAlpha = Math.min(1, (1 - o.z) * 0.9)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(sx, syy, rad, 0, Math.PI * 2); ctx.fill()
        // rim
        ctx.globalAlpha = Math.min(0.5, (1 - o.z))
        ctx.strokeStyle = o.c; ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(sx, syy, rad * 0.62, 0, Math.PI * 2); ctx.stroke()
      }

      // stars
      for (const s of stars) {
        s.pz = s.z
        s.z -= vel
        if (s.z <= 0.03) { s.z = 1; s.pz = 1; s.x = rand(-1, 1); s.y = rand(-1, 1) }
        const sx = cx + (s.x / s.z) * spread
        const syy = cy + (s.y / s.z) * spread
        if (sx < -50 || sx > w + 50 || syy < -50 || syy > h + 50) { s.z = 1; s.pz = 1; s.x = rand(-1, 1); s.y = rand(-1, 1); continue }
        const size = (1 - s.z) * 2.4
        const a = Math.min(1, (1 - s.z) * 1.1)
        // streak when moving fast
        const psx = cx + (s.x / s.pz) * spread
        const psy = cy + (s.y / s.pz) * spread
        ctx.globalAlpha = a
        if (boost > 0.004) {
          ctx.strokeStyle = s.c; ctx.lineWidth = size
          ctx.beginPath(); ctx.moveTo(psx, psy); ctx.lineTo(sx, syy); ctx.stroke()
        } else {
          ctx.fillStyle = s.c
          ctx.beginPath(); ctx.arc(sx, syy, size * 0.6 + 0.2, 0, Math.PI * 2); ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    if (reduce) {
      // static field
      ctx.fillStyle = 'rgba(3,4,10,1)'; ctx.fillRect(0, 0, w, h)
      for (const s of stars) {
        const sx = cx + s.x * spread * 0.5 + cx * 0.0, syy = cy + s.y * spread * 0.5
        ctx.fillStyle = s.c; ctx.globalAlpha = 0.5
        ctx.beginPath(); ctx.arc(sx, syy, 1, 0, Math.PI * 2); ctx.fill()
      }
    } else {
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} style={{ width: '100%', height: '100%' }} />
}
