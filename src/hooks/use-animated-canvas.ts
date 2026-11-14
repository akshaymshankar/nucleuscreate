import { useEffect, useRef } from "react";

// Shared loop for the animated canvas backgrounds, tuned so they never get in the way of scrolling:
// - 30 frames a second, timed by the clock, so speed is the same on 60 Hz and 120 Hz screens.
// - Pauses while the page is scrolling and resumes shortly after.
// - Pauses when off screen or in a background tab.
// - Draws at no more than 1.5x pixel density.
// - Draws one still frame for visitors with reduced motion turned on.

export type CanvasDraw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

const FRAME_MS = 1000 / 30;

// One page-wide flag, shared by every canvas, that is true while the page is scrolling.
let scrolling = false;
let scrollTimer = 0;
let listening = false;
function watchScroll() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener(
    "scroll",
    () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => (scrolling = false), 160);
    },
    { passive: true },
  );
}

export default function useAnimatedCanvas(draw: CanvasDraw, opts: { start?: number; speed?: number; maxDpr?: number } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { start = 3, speed = 1, maxDpr = 1.5 } = opts;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    watchScroll();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, frame = 0, visible = true, last = 0, t = start;

    const paint = () => { ctx.clearRect(0, 0, w, h); draw(ctx, w, h, t); };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!last) last = now;
      const dt = now - last;
      if (dt < FRAME_MS || scrolling || document.hidden) {
        if (scrolling || document.hidden) last = now; // don't jump ahead after a pause
        return;
      }
      last = now;
      t += Math.min(dt, 100) / 1000 * speed;
      paint();
    };
    const run = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (reduce || !visible) paint();
      else frame = requestAnimationFrame(loop);
    };
    resize(); paint(); run();
    const ro = new ResizeObserver(() => { resize(); paint(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) run(); else cancelAnimationFrame(frame); });
    io.observe(canvas);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); };
  }, [draw, start, speed, maxDpr]);

  return ref;
}
