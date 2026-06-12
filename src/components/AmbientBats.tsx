import { useEffect, useRef } from 'react'

// Top-down bat silhouette, head toward -Y, wingspan along ±X, drawn in a
// 0..100 (x) by 0..50 (y) box centred near (50,28). Used as a Path2D, scaled per bat.
const BAT_PATH =
  'M50 30 C40 18 30 20 18 12 C24 22 14 24 6 24 C16 28 10 36 20 36 C32 33 42 32 50 38 C58 32 68 33 80 36 C90 36 84 28 94 24 C86 24 76 22 82 12 C70 20 60 18 50 30 Z'

interface Bat {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  depth: number // 0 (far/small/faint) .. 1 (near/large)
  flapPhase: number
  flapSpeed: number
  wanderAngle: number
  ang: number
}

interface AmbientBatsProps {
  /** Number of bats. Scaled down automatically on small / coarse-pointer screens. */
  count?: number
  className?: string
}

/**
 * A decorative flock of bats that fly around the whole layer. Canvas-based for
 * performance, GPU-friendly (no layout), capped at devicePixelRatio 2, paused when
 * the tab is hidden. Purely ambient: aria-hidden, pointer-events none. The parent is
 * responsible for only mounting this when motion effects are enabled
 * (see useMotionEffects, which already respects prefers-reduced-motion).
 */
export default function AmbientBats({ count = 22, className = '' }: AmbientBatsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctxMaybe = canvasEl.getContext('2d')
    if (!ctxMaybe) return
    // Bind to non-null-typed locals: control-flow narrowing isn't retained inside the
    // nested rAF/resize closures, so without explicit types strict mode flags these as
    // possibly-null (which fails the production `tsc -b` build).
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctxMaybe

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const path = new Path2D(BAT_PATH)

    let W = 0
    let H = 0
    function resize() {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Fewer bats on small / touch screens (battery + density).
    const n = Math.max(4, Math.round(coarse || W < 640 ? count * 0.5 : count))
    const bats: Bat[] = []
    for (let i = 0; i < n; i++) {
      const depth = i / Math.max(1, n - 1)
      const seed = i * 73
      bats.push({
        x: ((seed * 13) % 97) / 97 * W,
        y: ((seed * 29) % 89) / 89 * H,
        vx: (((seed * 7) % 100) / 100 - 0.5) * 1.4,
        vy: (((seed * 11) % 100) / 100 - 0.5) * 1.4,
        size: 18 + depth * 26,
        depth,
        flapPhase: (seed % 100) / 100 * Math.PI * 2,
        flapSpeed: 0.18 + depth * 0.12,
        wanderAngle: (seed % 360) * (Math.PI / 180),
        ang: -Math.PI / 2,
      })
    }

    // Cursor target (gentle attraction when the pointer moves over the page).
    let cx = -9999
    let cy = -9999
    let cursorActive = false
    let cursorTimer: ReturnType<typeof setTimeout> | null = null
    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect()
      cx = e.clientX - r.left
      cy = e.clientY - r.top
      cursorActive = true
      if (cursorTimer) clearTimeout(cursorTimer)
      cursorTimer = setTimeout(() => {
        cursorActive = false
      }, 1400)
    }
    if (!coarse) window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)

    const MAX_SPEED = 2.2
    let raf = 0
    let running = true

    function step() {
      // Self-enforcing pause invariant: never draw on a hidden tab, regardless of
      // how `running` got set.
      if (!running || document.hidden) {
        running = false
        return
      }
      ctx.clearRect(0, 0, W, H)

      for (const b of bats) {
        // Wander: slowly drift the heading for organic flight.
        b.wanderAngle += (((b.x + b.y) % 7) / 7 - 0.5) * 0.12 + Math.sin(b.flapPhase) * 0.02
        b.vx += Math.cos(b.wanderAngle) * 0.05
        b.vy += Math.sin(b.wanderAngle) * 0.05

        // Gentle pull toward the cursor when it's active (nearer bats react more).
        if (cursorActive) {
          const dx = cx - b.x
          const dy = cy - b.y
          const d = Math.hypot(dx, dy) || 1
          const pull = 0.06 * (0.4 + b.depth)
          b.vx += (dx / d) * pull
          b.vy += (dy / d) * pull
        }

        // Soft steer away from edges so they roam the whole layer without piling up.
        const margin = 60
        if (b.x < margin) b.vx += 0.08
        if (b.x > W - margin) b.vx -= 0.08
        if (b.y < margin) b.vy += 0.08
        if (b.y > H - margin) b.vy -= 0.08

        // Clamp speed.
        const sp = Math.hypot(b.vx, b.vy)
        if (sp > MAX_SPEED) {
          b.vx = (b.vx / sp) * MAX_SPEED
          b.vy = (b.vy / sp) * MAX_SPEED
        }

        b.x += b.vx
        b.y += b.vy

        // Wrap around edges as a fallback (in case steering overshoots).
        if (b.x < -40) b.x = W + 40
        if (b.x > W + 40) b.x = -40
        if (b.y < -40) b.y = H + 40
        if (b.y > H + 40) b.y = -40

        if (sp > 0.15) b.ang = Math.atan2(b.vy, b.vx)
        b.flapPhase += b.flapSpeed
        const flap = 0.55 + 0.45 * Math.abs(Math.sin(b.flapPhase)) // wings open/close

        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate(b.ang + Math.PI / 2) // path faces -Y; align to heading
        const s = b.size / 100
        ctx.scale(s * flap, s) // flap squeezes wingspan
        ctx.translate(-50, -28) // centre the path box
        // Near bats are warmer/pinker and more present; far bats are dim plum silhouettes.
        // These rgba values intentionally mirror the ro.* palette (plum→ro-pink); the
        // tokens aren't exposed as CSS vars, so a canvas can't read them directly today.
        const alpha = 0.24 + b.depth * 0.5
        ctx.fillStyle = `rgba(${56 + b.depth * 70}, ${36 + b.depth * 22}, ${56 + b.depth * 48}, ${alpha})`
        ctx.fill(path)
        ctx.restore()
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    function onVisibility() {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(step)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      if (cursorTimer) clearTimeout(cursorTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="ambient-bats"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
