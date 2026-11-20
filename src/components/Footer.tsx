import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { container } from "@/components/site/Section";
import { CALENDLY_URL, EMAIL, LINKEDIN_URL, STUDIO_LINE } from "@/lib/site";

const linkCls = "text-sm text-white/55 transition-colors hover:text-white";
const head = "mb-4 text-sm font-medium text-white";

type Props = {
  // Per-page overrides, e.g. the AI video page speaks to brands rather than podcasts and agencies.
  line?: string;
  email?: string;
  showAgencies?: boolean;
  // Service links to leave out on this page, by route (e.g. the case study never mentions AI).
  hideServices?: string[];
};

export default function Footer({ line = STUDIO_LINE, email = EMAIL, showAgencies = true, hideServices = [] }: Props = {}) {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-16 text-white">
      <div className={container}>
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <img src="/logo-mark.png" alt="" width={28} height={28} loading="lazy" className="h-7 w-7" />
              <span className="font-heading text-lg font-semibold tracking-tight">Nucleus</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{line}</p>
            <a href={`mailto:${email}`} className={`${linkCls} mt-2 inline-block`}>{email}</a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            <div className="flex flex-col gap-3">
              <p className={head}>Services</p>
              {services.filter((s) => !hideServices.includes(s.to)).map((s) => (
                <Link key={s.to} to={s.to} className={linkCls}>{s.title}</Link>
              ))}
              {showAgencies && <Link to="/agencies" className={linkCls}>For agencies</Link>}
            </div>
            <div className="flex flex-col gap-3">
              <p className={head}>Company</p>
              <Link to="/#work" className={linkCls}>Work</Link>
              <Link to="/privacy-policy" className={linkCls}>Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className={head}>Contact</p>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>Calendly</a>
              {LINKEDIN_URL && (
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>LinkedIn</a>
              )}
              <a href={`mailto:${email}`} className={linkCls}>Email</a>
            </div>
          </div>
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-xs text-white/40">© {new Date().getFullYear()} Nucleus Productions. All rights reserved.</p>
      </div>
    </footer>
  );
}
