import type { ReactNode } from "react";
import { CALENDLY_URL } from "@/lib/site";
import { CtaLink } from "./Buttons";
import SampleForm from "./SampleForm";
import { container } from "./Section";

type Props = { title?: string; text?: string; form?: ReactNode };

export default function FinalCta({
  title = "Send us one episode. We'll show you what it can become.",
  text = "Book a call, or send us a link and we'll cut you a free sample.",
  form,
}: Props) {
  return (
    <section id="sample" className="scroll-mt-16 bg-[#050505] text-white">
      <div className={`${container} grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.15fr] lg:gap-16`}>
        <div>
          <p className="flex items-center gap-2 text-sm text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Work with us
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">{text}</p>
          <CtaLink href={CALENDLY_URL} variant="light" className="mt-8">
            Book a call
          </CtaLink>
        </div>
        {form ?? <SampleForm />}
      </div>
    </section>
  );
}
