import { useRef, useState } from "react";
import { Play } from "lucide-react";

type Props = {
  src: string;
  poster?: string;
  title: string;
  vertical?: boolean;
  className?: string;
};

// Click-to-play MP4 hosted on the site. Nothing downloads until the viewer presses play.
export default function LocalVideo({ src, poster, title, vertical = false, className = "" }: Props) {
  const [active, setActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setActive(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => undefined);
    });
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-900 ${vertical ? "aspect-[9/16]" : "aspect-video"} ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={active ? src : undefined}
        poster={poster}
        controls={active}
        playsInline
        preload="none"
        aria-label={title}
      />
      {!active && (
        <button type="button" onClick={start} aria-label={`Play ${title}`} className="group absolute inset-0 h-full w-full">
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
