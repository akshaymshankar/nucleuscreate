import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { CtaLink } from "@/components/site/Buttons";
import { container } from "@/components/site/Section";
import { services } from "@/data/services";
import { CALENDLY_URL } from "@/lib/site";

const links = [
  { label: "Work", to: "/#work" },
  { label: "For agencies", to: "/agencies" },
  { label: "Contact", to: "/#sample" },
];

// Services dropdown: opens on hover or click on desktop, closes on Escape or a click outside.
function ServicesMenu({ light }: { light: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 py-5 text-[13px] font-medium transition-opacity hover:opacity-100 ${light ? "opacity-70" : "opacity-80"}`}
      >
        Services
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-1">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-2 text-neutral-950 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]">
            {services.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 transition-colors hover:bg-black/[0.04]">
                <span className="block text-sm font-medium">{s.title}</span>
                <span className="mt-0.5 block text-[13px] text-neutral-500">{s.short}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Transparent with white text over the dark hero, then a light bar once the page scrolls.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const light = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        light ? "border-b border-black/[0.06] bg-[#FAFAFA]/[0.97] text-neutral-950" : "text-white"
      }`}
    >
      <nav aria-label="Main" className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/logo-mark.png" alt="" width={28} height={28} className={`h-7 w-7 transition ${light ? "invert" : ""}`} />
          <span className="font-heading text-[17px] font-semibold tracking-tight">Nucleus</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ServicesMenu light={light} />
          {links.map((link) => (
            <Link key={link.label} to={link.to} className={`text-[13px] font-medium transition-opacity hover:opacity-100 ${light ? "opacity-70" : "opacity-80"}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <CtaLink href={CALENDLY_URL} variant={light ? "dark" : "light"} className="!px-4 !py-2 text-[13px]">
            Book a call
          </CtaLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-black/[0.06] md:hidden">
          <div className={`${container} flex flex-col py-3`}>
            <p className="pb-1 pt-3 text-xs font-medium uppercase tracking-wider text-neutral-400">Services</p>
            {services.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setOpen(false)} className="py-2.5 text-lg">
                {s.title}
              </Link>
            ))}
            <div className="my-3 border-t border-black/[0.06]" />
            {links.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="py-2.5 text-lg">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
