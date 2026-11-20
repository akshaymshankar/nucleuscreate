// Runs after `vite build`. Writes dist/<route>/index.html for each service page with that page's
// title, description and preview image in the raw HTML, so LinkedIn, WhatsApp and iMessage
// (which don't run JavaScript) show the right link preview.
// Keep these in step with the usePageMeta() call on each page.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://nucleuscreate.in";

const routes = {
  "/podcasts": {
    title: "Podcast Editing: Full Episodes, Teasers and Shorts | Nucleus",
    description: "Full episode edit, a teaser and 3 to 5 Shorts every week, plus thumbnails. 3-day turnaround from a fixed team working US and UK hours.",
    image: "/og/podcasts.jpg",
  },
  "/motion-graphics": {
    title: "Motion Graphics: Explainers, Launch Promos and App Ads | Nucleus",
    description: "Brand explainers, launch promos and app ads, animated from script to final frame by a fixed team working US and UK hours.",
    image: "/og/motion-graphics.jpg",
  },
  "/clipping": {
    title: "Clipping: Shorts, Reels and TikToks from Your Long-Form | Nucleus",
    description: "Shorts, Reels and TikToks cut from your long-form, with captions and hooks. 48-hour turnaround from a fixed team working US and UK hours.",
    image: "/og/clipping.jpg",
  },
  "/services/ai-video-strategy": {
    title: "Nucleus Productions | AI video for brands",
    description: "We plan, script and make AI and hybrid videos for brands. See the work and book a 30 minute call.",
    image: "/og/ai-video.jpg",
  },
  "/case-studies/breaking-money": {
    title: "Breaking Money case study: 0 to 100K followers in under 6 months | Nucleus",
    description: "13.7M Instagram views in the last 90 days, on daily short-form video shot and edited by the Nucleus team.",
    image: "/og/breaking-money.jpg",
  },
  "/agencies": {
    title: "White-Label Video Editing for Agencies | Nucleus",
    description: "White-label edits, hooks and variations for your clients. 48-hour turnaround, the same editors every time, never client-facing.",
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const template = readFileSync(join(dist, "index.html"), "utf8");

for (const [path, m] of Object.entries(routes)) {
  const t = esc(m.title);
  const d = esc(m.description);
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${SITE}${path}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE}${path}`);
  if (m.image) {
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*/, `$1${SITE}${m.image}`)
      .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${SITE}${m.image}`);
  }
  const out = join(dist, path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`route-meta: ${path}`);
}
