import { FormEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { LEAD_WEBHOOK_URL } from "@/lib/site";
import { primaryBtn } from "./Buttons";

const NEEDS = ["Full edit", "Teaser", "Shorts", "Motion graphics", "AI video", "Ads"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  show: z.string().trim().min(2, "Enter your show or agency name").max(200),
  link: z
    .string()
    .trim()
    .max(500)
    .regex(/^\S+\.\S+$/, "Paste a link to an episode or footage"),
  need: z.enum(NEEDS, { message: "Choose what you need" }),
});

type Values = { name: string; email: string; show: string; link: string; need: string };
type Errors = Partial<Record<keyof Values, string>>;

export const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-primary focus:outline-none sm:text-sm";

export function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function SampleForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "", show: "", link: "", need: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }

    setSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    const utms = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "utm_source_platform", "utm_placement"].map(
        (key) => [key, params.get(key) || ""],
      ),
    );

    const { name, email, show, link, need } = parsed.data;
    const payload = {
      name,
      email,
      show,
      link,
      need,
      // The current Google Apps Script only writes its original columns. These copies keep the
      // link and request visible in the sheet ("Agency", "Clients", "Videos") until the script
      // is updated. See "Pilot Lead Automation" in the README, then delete these three lines.
      agency: show,
      clients: link,
      videos: need,
      ...utms,
      source: `Free sample form (${window.location.pathname})`,
      requestedAt: new Date().toISOString(),
    };

    try {
      await fetch(LEAD_WEBHOOK_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
      navigate("/thank-you-page");
    } catch (err) {
      console.error(err);
      toast({
        title: "That didn't send",
        description: "Please try again, or email hello@nucleuscreate.in.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-2 sm:p-8">
      <Field id="sample-name" label="Name" error={errors.name}>
        <input id="sample-name" autoComplete="name" className={inputCls} value={values.name} onChange={(e) => set("name", e.target.value)} />
      </Field>
      <Field id="sample-email" label="Email" error={errors.email}>
        <input id="sample-email" type="email" autoComplete="email" className={inputCls} value={values.email} onChange={(e) => set("email", e.target.value)} />
      </Field>
      <Field id="sample-show" label="Show or agency name" error={errors.show}>
        <input id="sample-show" autoComplete="organization" className={inputCls} value={values.show} onChange={(e) => set("show", e.target.value)} />
      </Field>
      <Field id="sample-need" label="What you need" error={errors.need}>
        <select id="sample-need" className={`${inputCls} [&>option]:bg-neutral-900`} value={values.need} onChange={(e) => set("need", e.target.value)}>
          <option value="">Choose one</option>
          {NEEDS.map((need) => (
            <option key={need} value={need}>
              {need}
            </option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field id="sample-link" label="Link to an episode or footage" error={errors.link}>
          <input id="sample-link" inputMode="url" placeholder="YouTube, Drive or Dropbox link" className={inputCls} value={values.link} onChange={(e) => set("link", e.target.value)} />
        </Field>
      </div>
      <button type="submit" disabled={submitting} className={`${primaryBtn} w-full disabled:opacity-60 sm:col-span-2`}>
        {submitting ? "Sending..." : "Get my free sample"}
      </button>
    </form>
  );
}
