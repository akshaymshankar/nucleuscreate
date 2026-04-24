import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const halo = useRef({ x: -200, y: -200 });
  const hovering = useRef(false);
  const frameId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) {
        hovering.current = true;
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) {
        hovering.current = false;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const svg = svgRef.current;
      const haloEl = haloRef.current;

      if (svg) {
        svg.style.transform = `translate3d(${pos.current.x - 2}px, ${pos.current.y - 2}px, 0)`;
        svg.style.scale = hovering.current ? "1.06" : "1";
      }

      if (haloEl) {
        halo.current.x = lerp(halo.current.x, pos.current.x, 0.16);
        halo.current.y = lerp(halo.current.y, pos.current.y, 0.16);
        haloEl.style.transform = `translate3d(${halo.current.x - 16}px, ${halo.current.y - 16}px, 0)`;
        haloEl.style.scale = hovering.current ? "1.4" : "1";
        haloEl.style.opacity = hovering.current ? "0.5" : "0.25";
      }

      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      {/* Minimal green arrow cursor with nucleus core */}
      <svg
        ref={svgRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ width: 28, height: 28, filter: "drop-shadow(0 0 8px rgba(110, 240, 143, 0.4))" }}
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="arrowNucleus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6EF08F" stopOpacity="1" />
            <stop offset="100%" stopColor="#3cba5f" stopOpacity="1" />
          </radialGradient>
        </defs>

        <path
          d="M3.5 2.8L20.8 11.1L12.2 13.5L9.8 22.1L3.5 2.8Z"
          fill="rgba(110, 240, 143, 0.2)"
          stroke="#6EF08F"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <ellipse
          cx="11.6"
          cy="11.4"
          rx="2.7"
          ry="2.1"
          fill="none"
          stroke="#6EF08F"
          strokeWidth="0.6"
          opacity="0.9"
          transform="rotate(-26 11.6 11.4)"
        />
        <circle
          cx="11.6"
          cy="11.4"
          r="1.25"
          fill="url(#arrowNucleus)"
          style={{ animation: "nucleus-pulse 1.2s ease-in-out infinite" }}
        />
      </svg>

      {/* Subtle trailing halo */}
      <div
        ref={haloRef}
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{
          width: "32px",
          height: "32px",
          border: "1px solid rgba(110, 240, 143, 0.45)",
          transition: "scale 0.25s ease, opacity 0.25s ease",
        }}
      />

      <style>{`
        @keyframes nucleus-pulse {
          0%, 100% { opacity: 0.95; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.18); }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
