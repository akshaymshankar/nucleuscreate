import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NucleusLogo = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const orbitPaths = [
    { rx: 80, ry: 30, rotation: 0, duration: 8 },
    { rx: 80, ry: 30, rotation: 60, duration: 10 },
    { rx: 80, ry: 30, rotation: 120, duration: 12 },
  ];

  return (
    <motion.div
      className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64"
      animate={{ x: mousePos.x, y: mousePos.y }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Orbit rings */}
        {orbitPaths.map((orbit, i) => (
          <g key={i} transform={`rotate(${orbit.rotation} 100 100)`}>
            <motion.ellipse
              cx="100"
              cy="100"
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              stroke="hsl(134 68% 45% / 0.2)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
            {/* Orbiting particle */}
            <motion.circle
              r="4"
              fill="hsl(134 68% 45%)"
              filter="url(#glow)"
              animate={{
                cx: [100 + orbit.rx, 100, 100 - orbit.rx, 100, 100 + orbit.rx],
                cy: [100, 100 - orbit.ry, 100, 100 + orbit.ry, 100],
              }}
              transition={{
                duration: orbit.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}

        {/* Core nucleus */}
        <defs>
          <radialGradient id="coreGrad">
            <stop offset="0%" stopColor="hsl(134 68% 45%)" />
            <stop offset="100%" stopColor="hsl(134 68% 35%)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx="100"
          cy="100"
          r="22"
          fill="url(#coreGrad)"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        />

        {/* Organic swirl lines inside the core */}
        <motion.path
          d="M92 100 C94 94, 100 90, 104 96 C108 102, 112 98, 108 104 C104 110, 96 108, 92 100Z"
          fill="none"
          stroke="hsl(0 0% 0% / 0.6)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M88 98 C92 88, 106 86, 112 96 C118 106, 108 116, 96 112 C84 108, 84 100, 88 98Z"
          fill="none"
          stroke="hsl(0 0% 0% / 0.4)"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.8 }}
        />

        {/* Inner dot */}
        <circle cx="101" cy="99" r="3" fill="hsl(0 0% 0%)" />

        {/* Inner glow ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="hsl(134 68% 45% / 0.25)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Scattered particles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const dist = 50 + Math.random() * 30;
          return (
            <motion.circle
              key={i}
              cx={100 + Math.cos(angle) * dist}
              cy={100 + Math.sin(angle) * dist}
              r="1.5"
              fill="hsl(134 68% 45% / 0.4)"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                r: [1, 2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

export default NucleusLogo;
