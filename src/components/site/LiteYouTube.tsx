import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  youtubeId: string;
  title: string;
  vertical?: boolean;
  className?: string;
};

// Lazy YouTube embed: shows a thumbnail and only loads the player when clicked.
export default function LiteYouTube({ youtubeId, title, vertical = false, className = "" }: Props) {
  const [active, setActive] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-900 ${vertical ? "aspect-[9/16]" : "aspect-video"} ${className}`}>
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} aria-label={`Play ${title}`} className="group absolute inset-0 h-full w-full">
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setThumb(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
