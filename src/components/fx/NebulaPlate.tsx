/* A procedurally "generated" nebula plate — colored clouds warped by SVG turbulence
   into wispy cosmic gas. Static (rendered once, cheap) and screen-blended so the
   starfield still shows through. Blends natively with the app's palette. */

const CLOUDS = [
  { cx: 22, cy: 20, rx: 30, ry: 20, hue: '--blue' },
  { cx: 78, cy: 30, rx: 28, ry: 22, hue: '--indigo' },
  { cx: 58, cy: 70, rx: 32, ry: 22, hue: '--blue' },
  { cx: 18, cy: 76, rx: 26, ry: 18, hue: '--cyan' },
  { cx: 90, cy: 84, rx: 24, ry: 18, hue: '--indigo' },
]

export function NebulaPlate() {
  return (
    <div aria-hidden className="absolute inset-0" style={{ mixBlendMode: 'screen', opacity: 0.28 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <filter id="nebulaWisp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9 1.1" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>
        <g filter="url(#nebulaWisp)">
          {CLOUDS.map((c, i) => (
            <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill={`var(${c.hue})`} opacity={0.45} />
          ))}
        </g>
      </svg>
    </div>
  )
}
