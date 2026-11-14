// Backgrounds for the dark page headers, one per service, in the same quiet style:
// thin white lines with a few green accents, moving slowly. The shared canvas loop
// (use-animated-canvas) keeps them light while scrolling.
import useAnimatedCanvas, { type CanvasDraw as Draw } from "@/hooks/use-animated-canvas";

function CanvasBg({ draw, seed = 0 }: { draw: Draw; seed?: number }) {
  const ref = useAnimatedCanvas(draw, { start: 3 + seed });
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

const white = (a: number) => `rgba(255,255,255,${a})`;
const green = (a: number) => `rgba(34,197,94,${a})`;

// Podcasts: thin sound-wave lines stacked like a contour map.
const drawWaves: Draw = (ctx, w, h, t) => {
  const lines = 22;
  ctx.lineWidth = 1;
  for (let k = 0; k < lines; k++) {
    const y0 = h * (0.35 + (k / lines) * 0.6);
    const amp = h * 0.05 * (1 + k / lines);
    const near = Math.exp(-Math.pow((k - lines * 0.55) / 4, 2));
    ctx.strokeStyle = k % 6 === 3 ? green(0.18 + near * 0.25) : white(0.05 + near * 0.12);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 8) {
      const u = x / w;
      const y = y0 + Math.sin(u * 5 + t * 0.35 + k * 0.22) * amp + Math.sin(u * 11 - t * 0.5 + k * 0.4) * amp * 0.3;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
};

// Motion graphics: outlined shapes floating and turning, with keyframe diamonds on an easing curve.
const shapes = [
  { kind: 0, x: 0.62, y: 0.22, s: 46, r: 0.2, g: false },
  { kind: 1, x: 0.8, y: 0.3, s: 64, r: -0.15, g: true },
  { kind: 2, x: 0.92, y: 0.62, s: 52, r: 0.25, g: false },
  { kind: 0, x: 0.7, y: 0.78, s: 30, r: 0.3, g: true },
  { kind: 1, x: 0.53, y: 0.6, s: 26, r: 0.35, g: false },
  { kind: 2, x: 0.08, y: 0.18, s: 30, r: -0.2, g: false },
  { kind: 0, x: 0.3, y: 0.88, s: 22, r: 0.2, g: false },
  { kind: 1, x: 0.97, y: 0.12, s: 22, r: 0.4, g: false },
];
const drawShapes: Draw = (ctx, w, h, t) => {
  const mobile = w < 1024;
  // Easing curve with keyframes along the bottom.
  const y0 = h * 0.86, y1 = h * 0.6;
  const x0 = w * (mobile ? 0.05 : 0.45), x1 = w * 0.98;
  ctx.lineWidth = 1;
  ctx.strokeStyle = white(0.1);
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0 + (x1 - x0) * 0.55, y0, x0 + (x1 - x0) * 0.45, y1, x1, y1); ctx.stroke();
  const p = (t * 0.08) % 1;
  const ease = (u: number) => { const a = 1 - u; return [a * a * a * x0 + 3 * a * a * u * (x0 + (x1 - x0) * 0.55) + 3 * a * u * u * (x0 + (x1 - x0) * 0.45) + u * u * u * x1, a * a * a * y0 + 3 * a * a * u * y0 + 3 * a * u * u * y1 + u * u * u * y1]; };
  for (const k of [0, 1]) {
    const [kx, ky] = ease(k);
    ctx.save(); ctx.translate(kx, ky); ctx.rotate(Math.PI / 4);
    ctx.fillStyle = white(0.25); ctx.fillRect(-4, -4, 8, 8); ctx.restore();
  }
  const [mx, my] = ease(p);
  ctx.save(); ctx.translate(mx, my); ctx.rotate(Math.PI / 4);
  ctx.fillStyle = green(0.8); ctx.fillRect(-5, -5, 10, 10); ctx.restore();
  // Floating shapes.
  for (const s of shapes) {
    const x = (mobile ? 0.1 + s.x * 0.85 : s.x) * w + Math.sin(t * 0.4 + s.s) * 10;
    const y = s.y * h + Math.cos(t * 0.35 + s.x * 9) * 12;
    ctx.save(); ctx.translate(x, y); ctx.rotate(t * s.r);
    ctx.strokeStyle = s.g ? green(mobile ? 0.3 : 0.55) : white(mobile ? 0.1 : 0.22);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    if (s.kind === 0) ctx.arc(0, 0, s.s / 2, 0, Math.PI * 2);
    else if (s.kind === 1) ctx.roundRect(-s.s / 2, -s.s / 2, s.s, s.s, s.s * 0.18);
    else { ctx.moveTo(0, -s.s / 2); ctx.lineTo(s.s / 2, s.s / 2.4); ctx.lineTo(-s.s / 2, s.s / 2.4); ctx.closePath(); }
    ctx.stroke(); ctx.restore();
  }
};

// AI video: a dot field that brightens in a slow wave, like an image being generated.
const drawDots: Draw = (ctx, w, h, t) => {
  const gap = w < 640 ? 22 : 26;
  for (let y = gap / 2; y < h; y += gap) {
    for (let x = gap / 2; x < w; x += gap) {
      const u = x / w, v = y / h;
      const wave = Math.max(0, Math.sin(u * 7 - t * 0.9 + Math.sin(v * 3 + t * 0.3) * 1.5));
      const band = Math.exp(-Math.pow((v - 0.62 - 0.12 * Math.sin(u * 4 + t * 0.4)) * 4, 2));
      const r = Math.hypot((u - 0.7) / 0.75, (v - 0.6) / 0.75);
      const fade = Math.min(1, Math.max(0, (0.8 - r) / 0.5));
      if (fade <= 0) continue;
      const a = (0.07 + wave * band * 0.55) * fade;
      ctx.fillStyle = band * wave > 0.6 ? green(a) : white(a);
      ctx.beginPath();
      ctx.arc(x, y, 1.1 + band * wave * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

// Clipping: columns of vertical clip frames scrolling up like a feed.
const drawFeed: Draw = (ctx, w, h, t) => {
  const mobile = w < 1024;
  const cw = mobile ? 70 : 96, ch = cw * 16 / 9, gap = mobile ? 14 : 20;
  const cols = mobile ? Math.ceil(w / (cw + gap)) + 1 : 5;
  const startX = mobile ? -cw / 3 : w * 0.56;
  for (let c = 0; c < cols; c++) {
    const x = startX + c * (cw + gap);
    const speed = 14 + (c % 3) * 6;
    const span = ch + gap;
    const off = (t * speed + c * 97) % span;
    for (let i = -1; i * span < h + span; i++) {
      const y = i * span - off + (c % 2) * span * 0.45;
      const hot = (i + c * 2 + 20) % 5 === 0;
      const yc = (y + ch / 2) / h;
      const fade = Math.min(1, Math.max(0, Math.min(yc / 0.2, (1 - yc) / 0.2)));
      if (fade <= 0) continue;
      ctx.lineWidth = 1;
      const k = (mobile ? 0.5 : 1) * fade;
      ctx.strokeStyle = hot ? green(0.4 * k) : white(0.1 * k);
      ctx.fillStyle = hot ? green(0.05 * k) : white(0.015 * k);
      ctx.beginPath(); ctx.roundRect(x, y, cw, ch, 10); ctx.fill(); ctx.stroke();
      // Caption bars near the bottom of each clip.
      ctx.fillStyle = hot ? green(0.5 * k) : white(0.12 * k);
      ctx.fillRect(x + cw * 0.18, y + ch * 0.72, cw * 0.64, 3);
      ctx.fillRect(x + cw * 0.28, y + ch * 0.72 + 7, cw * 0.44, 3);
    }
  }
};

export function WavesBg({ seed = 0 }: { seed?: number }) {
  return <CanvasBg draw={drawWaves} seed={seed} />;
}
export function ShapesBg() {
  return <CanvasBg draw={drawShapes} />;
}
export function DotsBg() {
  return <CanvasBg draw={drawDots} />;
}
export function FeedBg() {
  return <CanvasBg draw={drawFeed} />;
}

// Agencies: light beams travelling along a faint grid, like work moving through a pipeline.
export function BeamsBg() {
  const beams = [
    { dir: "v", pos: "18%", delay: "0s", dur: "7s" },
    { dir: "v", pos: "62%", delay: "2.5s", dur: "9s" },
    { dir: "v", pos: "86%", delay: "5s", dur: "8s" },
    { dir: "h", pos: "30%", delay: "1.5s", dur: "10s" },
    { dir: "h", pos: "72%", delay: "4s", dur: "8.5s" },
  ];
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes gb-v{0%{transform:translateY(-120%)}100%{transform:translateY(900%)}}
        @keyframes gb-h{0%{transform:translateX(-120%)}100%{transform:translateX(1400%)}}
        @media (prefers-reduced-motion: reduce){.gb-beam{animation:none!important;opacity:0}}
      `}</style>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:96px_96px] [mask-image:radial-gradient(ellipse_at_50%_45%,black_25%,transparent_80%)]" />
      {beams.map((b, i) =>
        b.dir === "v" ? (
          <span key={i} className="gb-beam absolute top-0 h-[12%] w-px bg-gradient-to-b from-transparent via-[#22c55e] to-transparent opacity-70" style={{ left: b.pos, animation: `gb-v ${b.dur} linear ${b.delay} infinite` }} />
        ) : (
          <span key={i} className="gb-beam absolute left-0 h-px w-[8%] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" style={{ top: b.pos, animation: `gb-h ${b.dur} linear ${b.delay} infinite` }} />
        ),
      )}
    </div>
  );
}
