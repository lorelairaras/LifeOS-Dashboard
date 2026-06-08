# 3D Architecture — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 18)

---

## Architecture Overview

The 3D layer is a progressive enhancement on the public portfolio page. It loads lazily and degrades to the existing static UI when WebGL is unavailable.

```
[Portfolio Page]
  ├── [Hero Section]
  │     └── <Suspense> → <HeroScene3D />  (lazy, R3F canvas)
  ├── [Skills Section]
  │     └── <Suspense> → <SkillConstellation3D />  (lazy, R3F canvas)
  ├── [Projects Section]
  │     └── <ProjectCard3D />  (CSS perspective transforms, no lazy needed)
  └── [Contact Section]
        └── (no 3D)
```

---

## Component Structure

### CSS-Only 3D Components (`src/components/`)

| Component | Purpose | Dependencies |
|---|---|---|
| `Card3D.tsx` | Wrapper that adds 3D tilt on hover via CSS perspective | None |

### R3F Components (`src/features/portfolio/components/3d/`)

| Component | Purpose | Dependencies |
|---|---|---|
| `HeroScene.tsx` | Floating geometric shapes with mouse-follow parallax | R3F, drei |
| `SkillConstellation.tsx` | 3D node graph of skills | R3F, drei |
| `WebGLFallback.tsx` | Detects WebGL support, renders fallback if unavailable | None |
| `MotionGate.tsx` | Checks `prefers-reduced-motion` and disables 3D if set | None |

### Loading Strategy

```typescript
// Lazy load R3F components — only downloaded when portfolio page loads
const HeroScene = lazy(() => import('@/features/portfolio/components/3d/HeroScene'))
const SkillConstellation = lazy(() => import('@/features/portfolio/components/3d/SkillConstellation'))
```

---

## Card3D Component (CSS-only MVP)

No library dependencies. Works everywhere CSS3 is supported.

```typescript
// src/components/Card3D.tsx
interface Card3DProps {
  children: React.ReactNode
  className?: string
}

export default function Card3D({ children, className }: Card3DProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      className={`transition-transform duration-200 ease-out ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
```

---

## HeroScene Component (R3F)

```typescript
// Conceptual structure — implementation in Phase 19
function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingShapes />
      <MouseFollow />
    </Canvas>
  )
}
```

Key constraints:
- Max polygon count: 10K total (lightweight for mobile)
- Color palette: matches Tailwind theme (surface-800, accent colors)
- Animation: 60fps target, fallback to 30fps on low-power
- Render on demand (not continuous) when possible

---

## WebGL Detection

```typescript
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
```

---

## Performance Budget

| Metric | Budget | Measurement |
|---|---|---|
| Additional JS (gzipped) | < 160KB | `npm run build` output |
| Time to Interactive impact | < 500ms | Lighthouse CI |
| FPS on mid-range mobile | >= 30fps | Chrome DevTools |
| FPS on desktop | >= 60fps | Chrome DevTools |
| Canvas memory | < 50MB | Chrome Task Manager |

---

## Reduced Motion Support

```typescript
// src/features/portfolio/components/3d/MotionGate.tsx
function MotionGate({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  if (prefersReducedMotion) return <>{fallback}</>
  return <>{children}</>
}
```

---

## Standards-Readiness Notes

- **WCAG 2.1 AA (2.3.1 Three Flashes):** No flashing or strobing effects in 3D scenes.
- **WCAG 2.1 AA (2.3.3 Animation from Interactions):** `prefers-reduced-motion` respected via MotionGate.
- **ISO 27001 A.12.1.3 (Capacity management):** Performance budget defined with measurable thresholds.
- **ISO 9001 8.5.1:** Component architecture follows established project patterns.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial 3D architecture — component structure, loading strategy, performance budget |
