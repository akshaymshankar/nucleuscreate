import { useEffect } from "react";
import Lenis from "lenis";

const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => {
        // Smooth easing curve that feels buttery
        if (t === 0) return 0;
        if (t === 1) return 1;
        // Cubic-bezier-like easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
        return t < 0.5
          ? 2 * t * t * (3 - 2 * t)
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      },
      touchMultiplier: 1.8,
      infinite: false,
      syncTouch: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};

export default useSmoothScroll;
