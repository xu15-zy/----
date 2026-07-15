import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { patterns, type Pattern } from '../data/patterns';
import SideRays from './SideRays';
import ShapeBlur from './ShapeBlur';

const EASE = 'cubic-bezier(0.4,0,0.2,1)';
const DUR = 650; // ms — single source of truth for every switch animation

type Role = 'center' | 'left' | 'right' | 'backLeft' | 'backRight' | 'deepBack';

interface RoleSpec {
  left: number; // % horizontal position of the card centre
  scale: number;
  op: number;
  blur: number; // px
  rot: number; // deg (coverflow tilt)
  z: number;
}

// Per-role geometry. centre is the focused pattern; the rest fan out behind it.
const ROLES: Record<Role, RoleSpec> = {
  center: { left: 50, scale: 1, op: 1, blur: 0, rot: 0, z: 50 },
  right: { left: 72, scale: 0.62, op: 0.6, blur: 1.5, rot: -26, z: 40 },
  left: { left: 28, scale: 0.62, op: 0.6, blur: 1.5, rot: 26, z: 40 },
  backRight: { left: 87, scale: 0.42, op: 0.3, blur: 3, rot: -34, z: 30 },
  backLeft: { left: 13, scale: 0.42, op: 0.3, blur: 3, rot: 34, z: 30 },
  deepBack: { left: 50, scale: 0.3, op: 0.12, blur: 5, rot: 0, z: 20 },
};

/** Map a pattern index to its role relative to the active one (ring of 6). */
function roleFor(index: number, active: number, n: number): Role {
  const offset = (index - active + n) % n;
  if (offset === 0) return 'center';
  if (offset === 1) return 'right';
  if (offset === n - 1) return 'left';
  if (offset === 2) return 'backRight';
  if (offset === n - 2) return 'backLeft';
  return 'deepBack';
}

interface CardStyle {
  transform: string;
  opacity: number;
  filter: string;
  zIndex: number;
  boxShadow: string;
  pointerEvents: 'auto' | 'none';
}

function cardStyle(role: Role, p: Pattern, isMobile: boolean, disabled: boolean): CardStyle {
  const r = ROLES[role];
  // Pull side cards inward on small screens so they don't overflow.
  const lx = isMobile ? 50 + (r.left - 50) * 0.62 : r.left;
  const sc = isMobile ? r.scale * 0.82 : r.scale;
  // Horizontal offset is expressed as a viewport-relative translateX so the
  // carousel animates on the compositor (transform-only) instead of thrashing
  // layout by animating `left`. Cards sit at left:50% top:50% via CSS, and this
  // translateX shifts the centre to lx% of the viewport width.
  return {
    transform: `translate(-50%, -50%) translateX(${(lx - 50).toFixed(3)}vw) scale(${sc}) rotateY(${r.rot}deg)`,
    opacity: r.op,
    filter: `blur(${r.blur}px)`,
    zIndex: r.z,
    boxShadow:
      role === 'center'
        ? `0 0 70px ${p.glow}66, 0 30px 70px rgba(0,0,0,.55)`
        : `0 20px 50px rgba(0,0,0,.45)`,
    pointerEvents: disabled ? 'none' : 'auto',
  };
}

export default function PatternGallery() {
  const n = patterns.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const [autoPaused, setAutoPaused] = useState(false);
  const lockRef = useRef(false);

  const active = patterns[activeIndex];

  // Preload all preview images on mount.
  useEffect(() => {
    patterns.forEach((p) => {
      const img = new Image();
      img.src = p.preview;
    });
  }, []);

  // Track viewport size for the mobile layout.
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Core navigation: advance / retreat by one, with an animation lock.
  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setIsAnimating(true);
      setActiveIndex((prev) => (dir === 1 ? (prev + 1) % n : (prev + n - 1) % n));
      window.setTimeout(() => {
        lockRef.current = false;
        setIsAnimating(false);
      }, DUR);
    },
    [n]
  );

  // Mouse control: jump directly to any pattern by clicking it. The active
  // pattern is the only one that will enter its detail page; other cards just
  // move into focus. Uses the same lock so rapid clicks don't overlap.
  const goTo = useCallback(
    (target: number) => {
      if (lockRef.current || target === activeIndex) return;
      lockRef.current = true;
      setIsAnimating(true);
      setActiveIndex(target);
      window.setTimeout(() => {
        lockRef.current = false;
        setIsAnimating(false);
      }, DUR);
    },
    [activeIndex]
  );

  // Auto-play carousel every 4s; pause on hover or tab hidden.
  useEffect(() => {
    if (autoPaused) return;
    const id = window.setInterval(() => navigate(1), 4000);
    return () => window.clearInterval(id);
  }, [autoPaused, navigate]);

  useEffect(() => {
    const onVis = () => setAutoPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Keyboard support.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      else if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  // Animate only compositor-friendly properties (transform / opacity / filter).
  // `left` and box-shadow are intentionally excluded — animating `left` forces
  // layout recalculation every frame, which is the main source of the stutter.
  const transition = `transform ${DUR}ms ${EASE}, opacity ${DUR}ms ${EASE}, filter ${DUR}ms ${EASE}`;

  return (
    <div
      className="pg-root"
      style={{ background: active.bg, transition: `background ${DUR}ms ${EASE}` }}
      onMouseEnter={() => setAutoPaused(true)}
      onMouseLeave={() => setAutoPaused(false)}
    >
      {/* Ambient SideRays glow — fixed behind every layer as the page
          background. Tuned to the site's gold + mineral-blue palette and
          kept subtle so it never competes with the cards. */}
      <div className="pg-rays" aria-hidden>
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={1.25}
          spread={2.4}
          origin="top-right"
          tilt={8}
          saturation={1.35}
          blend={0.74}
          falloff={1.6}
          opacity={0.5}
        />
      </div>

      {/* Cursor-following ShapeBlur glow — a gold "spotlight" that tracks the
          mouse across the carousel images and the hoverable cards/arrows/guide.
          Purely visual (pointer-events:none) so it never blocks interaction. */}
      <div className="pg-shapeblur" aria-hidden>
        <ShapeBlur
          variation={2}
          shapeSize={1.25}
          roundness={0.45}
          borderSize={0.55}
          circleSize={0.7}
          circleEdge={0.7}
          color="#d8b25a"
        />
      </div>

      {/* Top navigation — brand returns to the home page; links follow the
          same gold palette as the home site for a consistent look. */}
      <nav className="pg-nav">
        <a className="pg-brand" href="./">敦 煌 纹 样</a>
        <div className="pg-nav-links">
          <a className="pg-nav-link" href="./">首页</a>
          <span className="pg-nav-link is-active">纹样轮播</span>
        </div>
      </nav>

      {/* Giant watermark — cross-fades between patterns */}
      {patterns.map((p, i) => (
        <div
          key={p.id}
          className="pg-watermark"
          aria-hidden
          style={{
            opacity: i === activeIndex ? 0.09 : 0,
            color: p.glow,
            transition: `opacity ${DUR}ms ${EASE}`,
          }}
        >
          {p.en}
        </div>
      ))}

      {/* Carousel cards */}
      {patterns.map((p, i) => {
        const role = roleFor(i, activeIndex, n);
        const st = cardStyle(role, p, isMobile, isAnimating);
        const isCenter = role === 'center';
        return (
          <a
            key={p.id}
            href={p.route}
            className="pg-card"
            aria-current={isCenter}
            style={{ ...st, transition, cursor: 'pointer' }}
            onClick={(e) => {
              if (lockRef.current) {
                e.preventDefault();
                return;
              }
              if (!isCenter) {
                // Click a non-active pattern: select it, don't navigate yet.
                e.preventDefault();
                goTo(i);
              }
              // Click the active pattern: let the link navigate to detail.
            }}
          >
            <img
              src={p.preview}
              alt={p.name}
              className="pg-img"
              draggable={false}
              style={{
                filter: p.preview.endsWith('.svg')
                  ? `drop-shadow(0 0 3px rgba(0,0,0,.9)) invert(1) brightness(1.12) drop-shadow(0 0 16px ${p.glow})`
                  : `drop-shadow(0 0 3px rgba(0,0,0,.9)) drop-shadow(0 0 16px ${p.glow})`,
              }}
            />
          </a>
        );
      })}

      {/* Global noise texture */}
      <div className="pg-noise" aria-hidden />

      {/* Bottom-left: pattern title / subtitle / description / navigation arrows */}
      <div className="pg-info" key={activeIndex}>
        <h1
          className="pg-info-title"
          style={{ textShadow: `0 0 55px ${active.glow}45` }}
        >
          {active.name}
        </h1>
        <div className="pg-info-subtitle">
          {active.sub}
          <span style={{ color: active.glow }}>{active.en}</span>
        </div>
        <p className="pg-info-desc">{active.desc}</p>
        <div className="pg-arrows">
          <button
            className="pg-arrow"
            aria-label="上一个纹样"
            onClick={() => navigate(-1)}
            disabled={isAnimating}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="pg-arrow"
            aria-label="下一个纹样"
            onClick={() => navigate(1)}
            disabled={isAnimating}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Bottom-right: guide to detail page */}
      <a
        className="pg-guide"
        href={active.route}
        onClick={(e) => {
          if (lockRef.current) e.preventDefault();
        }}
      >
        <span>点击选中 · 再次点击进入详情</span>
        <ArrowUpRight size={20} />
      </a>
    </div>
  );
}
