import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      {/* DNA Helix Cursor Core */}
      <svg
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-lighten"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
          transition: "all 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        viewBox="0 0 32 32"
      >
        <defs>
          <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(134, 68%, 45%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(134, 68%, 45%)" stopOpacity="0.3" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation={isHovering ? "3" : "1.5"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rotating rings */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="16"
            cy="16"
            r={isHovering ? "14" : "10"}
            fill="none"
            stroke="hsl(134, 68%, 45%)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </motion.g>

        {/* Counter-rotating inner ring */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="16"
            cy="16"
            r={isHovering ? "9" : "6"}
            fill="none"
            stroke="hsl(134, 68%, 45%)"
            strokeWidth="0.5"
            opacity="0.6"
          />
        </motion.g>

        {/* DNA helix strands */}
        <motion.path
          d="M 16 6 Q 20 11, 16 16 Q 12 21, 16 26"
          fill="none"
          stroke="hsl(134, 68%, 45%)"
          strokeWidth="0.8"
          opacity="0.5"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 16 6 Q 12 11, 16 16 Q 20 21, 16 26"
          fill="none"
          stroke="hsl(134, 68%, 45%)"
          strokeWidth="0.8"
          opacity="0.5"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />

        {/* Central nucleus core */}
        <circle
          cx="16"
          cy="16"
          r={isHovering ? "5" : "3.5"}
          fill="url(#nucleusGrad)"
          filter="url(#glow)"
          style={{
            transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Pulsing glow */}
        <motion.circle
          cx="16"
          cy="16"
          r={isHovering ? "7" : "5"}
          fill="none"
          stroke="hsl(134, 68%, 45%)"
          strokeWidth="0.3"
          opacity={isHovering ? 0.6 : 0.3}
          animate={{ r: isHovering ? [7, 10] : [5, 7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </svg>

      {/* Outer ring glow effect */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/40 pointer-events-none z-[9998]"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;
