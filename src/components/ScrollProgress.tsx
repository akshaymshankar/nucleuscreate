import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
