import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { BRAND_ENQUIRY_EMAIL, LEAD_WEBHOOK_URL } from "@/lib/site";
import { primaryBtn } from "./Buttons";
import { Field, inputCls } from "./SampleForm";

// Brand enquiry form for the AI video page. Each enquiry is emailed to BRAND_ENQUIRY_EMAIL
// (through FormSubmit) and also written to the leads sheet through the existing webhook.

const NEEDS = ["Product ad", "Brand film", "Launch or campaign reels", "Hybrid (shoot + AI)", "3D product shots", "Not sure yet"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  brand: z.string().trim().min(2, "Enter your brand name").max(200),
  link: z.string().trim().max(500).regex(/^\S+\.\S+$/, "Paste your website or a product link"),
  need: z.enum(NEEDS, { message: "Choose what you need" }),
  notes: z.string().trim().max(2000).optional(),
});

type Values = { name: string; email: string; brand: string; link: string; need: string; notes: string };
type Errors = Partial<Record<keyof Values, string>>;

export default function BrandForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "", brand: "", link: "", need: "", notes: "" });
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
    const { name, email, brand, link, need, notes = "" } = parsed.data;
    const source = `Brand enquiry form (${window.location.pathname})`;

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${BRAND_ENQUIRY_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New brand enquiry: ${brand}`,
          _template: "table",
          _captcha: "false",
          _replyto: email,
          Name: name,
          Email: email,
          "Brand name": brand,
          "Website or product link": link,
          "What you need": need,
          "Anything else": notes || "(nothing added)",
          Page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(`Email send failed: ${res.status}`);
      // Copy to the leads sheet. Never block the visitor on this.
      fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ name, email, show: brand, link, need, notes, agency: brand, clients: link, videos: need, ...utms, source, requestedAt: new Date().toISOString() }),
      }).catch(() => undefined);
      navigate("/thank-you-page");
    } catch (err) {
      console.error(err);
      toast({ title: "That didn't send", description: `Please try again, or email ${BRAND_ENQUIRY_EMAIL}.`, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-2 sm:p-8">
      <Field id="brand-name-person" label="Name" error={errors.name}>
        <input id="brand-name-person" autoComplete="name" className={inputCls} value={values.name} onChange={(e) => set("name", e.target.value)} />
      </Field>
      <Field id="brand-email" label="Email" error={errors.email}>
        <input id="brand-email" type="email" autoComplete="email" className={inputCls} value={values.email} onChange={(e) => set("email", e.target.value)} />
      </Field>
      <Field id="brand-brand" label="Brand name" error={errors.brand}>
        <input id="brand-brand" autoComplete="organization" className={inputCls} value={values.brand} onChange={(e) => set("brand", e.target.value)} />
      </Field>
      <Field id="brand-need" label="What you need" error={errors.need}>
        <select id="brand-need" className={`${inputCls} [&>option]:bg-neutral-900`} value={values.need} onChange={(e) => set("need", e.target.value)}>
          <option value="">Choose one</option>
          {NEEDS.map((need) => (
            <option key={need} value={need}>{need}</option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field id="brand-link" label="Website or product link" error={errors.link}>
          <input id="brand-link" inputMode="url" placeholder="yourbrand.com" className={inputCls} value={values.link} onChange={(e) => set("link", e.target.value)} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="brand-notes" label="Anything else (optional)" error={errors.notes}>
          <textarea id="brand-notes" rows={3} className={`${inputCls} resize-y`} value={values.notes} onChange={(e) => set("notes", e.target.value)} />
        </Field>
      </div>
      <button type="submit" disabled={submitting} className={`${primaryBtn} w-full disabled:opacity-60 sm:col-span-2`}>
        {submitting ? "Sending..." : "Get a quote"}
      </button>
    </form>
  );
}
