// Work samples shown on the homepage, /podcasts and /agencies.
//
// Each video is either a YouTube embed (youtubeId), a local MP4 (src + poster)
// or a placeholder tile (placeholder: true) that renders a "coming soon" card.
// Search for "TODO(work)" to find every slot that still needs a real link.

export type WorkVideo = {
  id: string;
  show: string;
  format: string;
  work: string;
  youtubeId?: string;
  src?: string;
  poster?: string;
  vertical?: boolean;
  placeholder?: boolean;
};

export type WorkTab = {
  id: string;
  label: string;
  videos: WorkVideo[];
  // Optional link under the grid, used on the homepage to point at the full service page.
  more?: { label: string; to: string };
};

export const podcastTeasers: WorkVideo[] = [
  {
    id: "kp-mullenweg-teaser",
    show: "Kleiner Perkins",
    format: "Podcast teaser",
    work: "Teaser edit for the episode with Matt Mullenweg",
    youtubeId: "-H-Y7i9EtbQ",
  },
  {
    id: "infinite-loops-teaser",
    show: "Infinite Loops",
    format: "Podcast teaser",
    work: "Teaser edit for the Jim and Emma episode",
    youtubeId: "kRmeoZhi8sw",
  },
  {
    id: "intrinsic-value-teaser",
    show: "The Intrinsic Value Podcast",
    format: "Podcast teaser",
    work: "Teaser edit for the podcast",
    youtubeId: "t8vLk50R4kw",
  },
  {
    id: "tip-ludmer-teaser",
    show: "TIP",
    format: "Podcast teaser",
    work: "Teaser edit for the Matt Ludmer episode",
    youtubeId: "Af0xmpUVLGM",
  },
];

// TODO(work): add the show name for each Short once confirmed. The playlist titles only say "Short #1" to "#3".
export const shorts: WorkVideo[] = [
  {
    id: "short-1",
    show: "Podcast Short",
    format: "Short, 9:16",
    work: "Vertical cut from a full episode",
    youtubeId: "kwQuXjeiOlY",
    vertical: true,
  },
  {
    id: "short-2",
    show: "Podcast Short",
    format: "Short, 9:16",
    work: "Vertical cut from a full episode",
    youtubeId: "A6Lz6CsSQ14",
    vertical: true,
  },
  {
    id: "short-3",
    show: "Podcast Short",
    format: "Short, 9:16",
    work: "Vertical cut from a full episode",
    youtubeId: "vmbrKkfUHQo",
    vertical: true,
  },
];

export const fullEpisodes: WorkVideo[] = [
  {
    id: "infinite-loops-greenberg",
    show: "Infinite Loops",
    format: "Full episode",
    work: "Full episode edit, Spencer Greenberg interview",
    youtubeId: "nJBxhS4GqFU",
  },
  // TODO(work): add the Kleiner Perkins full episode link (the one the teaser above was cut from).
  {
    id: "episode-placeholder-1",
    show: "Kleiner Perkins",
    format: "Full episode",
    work: "Link coming soon",
    placeholder: true,
  },
  // TODO(work): add one more full episode link.
  {
    id: "episode-placeholder-2",
    show: "Full episode",
    format: "Full episode",
    work: "Link coming soon",
    placeholder: true,
  },
];

// Motion graphics samples. Compressed 720p copies of the files in the "Motion graphics" Drive folder,
// stored in public/work/motion.
export const motionGraphics: WorkVideo[] = [
  {
    id: "nucleus-explainer",
    show: "Nucleus",
    format: "Brand explainer",
    work: "Our own studio explainer, built in motion",
    src: "/work/motion/nucleus-explainer.mp4",
    poster: "/work/motion/nucleus-explainer.jpg",
    vertical: true,
  },
  {
    id: "atlys-not-a-coin",
    show: "Atlys",
    format: "Launch promo",
    work: "Collage animation for the One Way Out visa sale",
    src: "/work/motion/atlys-not-a-coin.mp4",
    poster: "/work/motion/atlys-not-a-coin.jpg",
    vertical: true,
  },
  {
    id: "zuperior-trading",
    show: "Zuperior",
    format: "App promo",
    work: "Neon interface animation for a trading app",
    src: "/work/motion/zuperior-trading.mp4",
    poster: "/work/motion/zuperior-trading.jpg",
    vertical: true,
  },
  {
    id: "onemagnify",
    show: "OneMagnify",
    format: "Brand explainer",
    work: "Data and analytics story with client case studies",
    src: "/work/motion/onemagnify.mp4",
    poster: "/work/motion/onemagnify.jpg",
    vertical: true,
  },
  {
    id: "indus-app",
    show: "Indus",
    format: "App ad",
    work: "Investing app launch with animated product screens",
    src: "/work/motion/indus-app.mp4",
    poster: "/work/motion/indus-app.jpg",
    vertical: true,
  },
  {
    id: "strike-rrg",
    show: "Strike",
    format: "Explainer",
    work: "Relative Rotation Graphs, with animated charts",
    src: "/work/motion/strike-rrg.mp4",
    poster: "/work/motion/strike-rrg.jpg",
    vertical: true,
  },
];

// AI video samples. Compressed 720p copies of the files in the "AI Videos" Drive folder,
// stored in public/work/ai. The first six show by default; the rest sit behind "Show all".
export const aiVideo: WorkVideo[] = [
  {
    id: "sapphire-wedding",
    show: "Sapphire Events",
    format: "Brand film",
    work: "A destination wedding film by the sea, with AI guests and decor that look real, made without a single day on location",
    src: "/work/ai/sapphire-wedding.mp4",
    poster: "/work/ai/sapphire-wedding.jpg",
    vertical: true,
  },
  {
    id: "arka-collection",
    show: "Arka Fine Jewels",
    format: "Product ad",
    work: "Solitaire rings catching the light in close-up, the kind of shot that usually needs a macro studio day",
    src: "/work/ai/arka-collection.mp4",
    poster: "/work/ai/arka-collection.jpg",
    vertical: true,
  },
  {
    id: "lord-milano-riyadh",
    show: "Lord Milano",
    format: "Product ad",
    work: "A luxury perfume film set in Riyadh at night, made fully with AI and finished with rich colour",
    src: "/work/ai/lord-milano-riyadh.mp4",
    poster: "/work/ai/lord-milano-riyadh.jpg",
    vertical: true,
  },
  {
    id: "world-of-oud-explainer",
    show: "World of Oud",
    format: "Brand film",
    work: "The story of oud, from the resin in the tree to the bottle on the shelf",
    src: "/work/ai/world-of-oud-explainer.mp4",
    poster: "/work/ai/world-of-oud-explainer.jpg",
    vertical: true,
  },
  {
    id: "nemari-vanity",
    show: "Nemari",
    format: "Product ad",
    work: "A close look at a handmade leather vanity case: the stitching, the gold clasps and the trays inside",
    src: "/work/ai/nemari-vanity.mp4",
    poster: "/work/ai/nemari-vanity.jpg",
    vertical: true,
  },
  {
    id: "thetabody-detox",
    show: "Thetabody",
    format: "Product ad",
    work: "A skincare ad that shows the charcoal mask cleaning deep into the pores, with close-up AI shots of the skin",
    src: "/work/ai/thetabody-detox.mp4",
    poster: "/work/ai/thetabody-detox.jpg",
    vertical: true,
  },
  {
    id: "woo-concept-4",
    show: "World of Oud",
    format: "Product ad",
    work: "Arabian Oud gift set",
    src: "/work/ai/woo-concept-4.mp4",
    poster: "/work/ai/woo-concept-4.jpg",
    vertical: true,
  },
  {
    id: "aroma-hairmask",
    show: "Aroma",
    format: "Product ad",
    work: "A hair mask ad for Reels and TikTok, with close-ups of the ingredients and soft, shiny hair",
    src: "/work/ai/aroma-hairmask.mp4",
    poster: "/work/ai/aroma-hairmask.jpg",
    vertical: true,
  },
  {
    id: "scalpcare",
    show: "ScalpCare",
    format: "Product ad",
    work: "A haircare ad that walks through the problem, the product and the offer, with AI models that look real",
    src: "/work/ai/scalpcare.mp4",
    poster: "/work/ai/scalpcare.jpg",
    vertical: true,
  },
  {
    id: "arka-solitaire",
    show: "Arka Fine Jewels",
    format: "Product ad",
    work: "Solitaire rings catching the light in close-up, the kind of shot that usually needs a macro studio day",
    src: "/work/ai/arka-solitaire.mp4",
    poster: "/work/ai/arka-solitaire.jpg",
    vertical: true,
  },
  {
    id: "sapphire-concept-2",
    show: "Sapphire Events",
    format: "Brand film",
    work: "Wedding concept, second film",
    src: "/work/ai/sapphire-concept-2.mp4",
    poster: "/work/ai/sapphire-concept-2.jpg",
    vertical: true,
  },
  {
    id: "lord-milano-hook",
    show: "Lord Milano",
    format: "Hook",
    work: "Opening hook for a fragrance ad",
    src: "/work/ai/lord-milano-hook.mp4",
    poster: "/work/ai/lord-milano-hook.jpg",
    vertical: true,
  },
  {
    id: "srm-hologram",
    show: "SRM",
    format: "Product ad",
    work: "A 3D hologram on the side of a van driving through the city at night, made with AI and 3D",
    src: "/work/ai/srm-hologram.mp4",
    poster: "/work/ai/srm-hologram.jpg",
    vertical: true,
  },
  {
    id: "srm-projection-2",
    show: "SRM",
    format: "Product ad",
    work: "Van advertising for a laundry brand",
    src: "/work/ai/srm-projection-2.mp4",
    poster: "/work/ai/srm-projection-2.jpg",
    vertical: true,
  },
  {
    id: "autohub-corvette",
    show: "AutoHub",
    format: "Product ad",
    work: "A Corvette and a Camry side by side. Real car footage mixed with AI race scenes, with Arabic subtitles",
    src: "/work/ai/autohub-corvette.mp4",
    poster: "/work/ai/autohub-corvette.jpg",
    vertical: true,
  },
  {
    id: "autohub-cinematic",
    show: "AutoHub",
    format: "Product ad",
    work: "A fast car commercial: real tracking shots mixed with AI speed effects, with Arabic on-screen text",
    src: "/work/ai/autohub-cinematic.mp4",
    poster: "/work/ai/autohub-cinematic.jpg",
    vertical: true,
  },
  {
    id: "thetabody-captions",
    show: "Thetabody",
    format: "Product ad",
    work: "Skincare ad with captions",
    src: "/work/ai/thetabody-captions.mp4",
    poster: "/work/ai/thetabody-captions.jpg",
    vertical: true,
  },
  {
    id: "woo-tester-kit",
    show: "World of Oud",
    format: "Product ad",
    work: "A fast vertical ad for a fragrance tester kit, made for TikTok and Meta",
    src: "/work/ai/woo-tester-kit.mp4",
    poster: "/work/ai/woo-tester-kit.jpg",
    vertical: true,
  },
];

// Homepage: a few picks per service, each tab linking to that service's page for the rest.
export const homeWorkTabs: WorkTab[] = [
  {
    id: "podcasts",
    label: "Podcast editing",
    videos: [podcastTeasers[0], podcastTeasers[1], fullEpisodes[0]],
    more: { label: "See all podcast work", to: "/podcasts" },
  },
  {
    id: "motion",
    label: "Motion graphics",
    videos: motionGraphics.slice(0, 3),
    more: { label: "See all motion graphics", to: "/motion-graphics" },
  },
  {
    id: "ai",
    label: "AI video",
    videos: aiVideo.slice(0, 3),
    more: { label: "See all AI video", to: "/services/ai-video-strategy" },
  },
  {
    id: "clipping",
    label: "Clipping",
    videos: shorts,
    more: { label: "See all clipping", to: "/clipping" },
  },
];

const ai = (...ids: string[]) => ids.map((id) => aiVideo.find((v) => v.id === id)!).filter(Boolean);

export const aiWorkTabs: WorkTab[] = [
  { id: "all", label: "All work", videos: aiVideo },
  { id: "beauty", label: "Beauty and haircare", videos: ai("thetabody-detox", "scalpcare", "aroma-hairmask", "thetabody-captions") },
  { id: "fragrance", label: "Fragrance and oud", videos: ai("lord-milano-riyadh", "world-of-oud-explainer", "woo-tester-kit", "woo-concept-4", "lord-milano-hook") },
  { id: "jewellery", label: "Jewellery and fashion", videos: ai("arka-solitaire", "arka-collection", "nemari-vanity") },
  { id: "auto-events", label: "Auto, events and outdoor", videos: ai("autohub-corvette", "autohub-cinematic", "sapphire-wedding", "sapphire-concept-2", "srm-hologram", "srm-projection-2") },
];

export const motionWorkTabs: WorkTab[] = [{ id: "motion", label: "Motion graphics", videos: motionGraphics }];

export const podcastWorkTabs: WorkTab[] = [
  { id: "teasers", label: "Teasers", videos: podcastTeasers },
  { id: "shorts", label: "Shorts", videos: shorts },
  { id: "episodes", label: "Full episodes", videos: fullEpisodes },
];

// TODO(work): add paid social hook, cutdown and variation samples for the agencies page.
export const agencyWorkTabs: WorkTab[] = [
  { id: "teasers", label: "Teasers", videos: podcastTeasers },
  { id: "shorts", label: "Short-form cutdowns", videos: shorts },
  {
    id: "hooks",
    label: "Hooks and variations",
    videos: [
      { id: "hook-placeholder-1", show: "Paid social", format: "Hook variations", work: "Sample coming soon", placeholder: true },
      { id: "hook-placeholder-2", show: "Paid social", format: "Cutdown", work: "Sample coming soon", placeholder: true },
      { id: "hook-placeholder-3", show: "Paid social", format: "UGC edit", work: "Sample coming soon", placeholder: true },
    ],
  },
];

// TODO(work): add more clips (Reels, TikToks, LinkedIn) as they go live.
export const clippingWorkTabs: WorkTab[] = [
  { id: "shorts", label: "Shorts", videos: shorts },
  { id: "teasers", label: "Teasers", videos: podcastTeasers },
];
