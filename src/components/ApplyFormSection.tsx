import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid business email").max(255),
  phone: z.string().trim().min(7, "Enter a valid number").max(20),
  agency: z.string().trim().min(2, "Enter your agency name or website").max(200),
  clients: z.union([z.literal("1-3"), z.literal("4-10"), z.literal("10+")], { message: "Select an option" }),
  videos: z.union([z.literal("1-10"), z.literal("11-30"), z.literal("31-50"), z.literal("50+")], { message: "Select an option" }),
  budget: z.union([z.literal("under-10k"), z.literal("20-50k"), z.literal("50k+")], { message: "Select an option" }),
  meeting: z.union([z.literal("yes"), z.literal("no")], { message: "Select an option" }),
});

type FormData = z.infer<typeof formSchema>;

const initial: FormData = {
  name: "", email: "", phone: "", agency: "",
  clients: "" as FormData["clients"],
  videos: "" as FormData["videos"],
  budget: "" as FormData["budget"],
  meeting: "yes",
};

const Field = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => (
  <label className="block">
    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-heading">{label}</span>
    <div className="mt-2">{children}</div>
    {error && <span className="mt-1 block text-xs text-destructive font-body">{error}</span>}
  </label>
);

const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none focus:border-primary/60 transition-colors";

const leadWebhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;
const calendlyUrl = (import.meta.env.VITE_CALENDLY_URL as string | undefined) || "https://calendly.com";

const ApplyFormSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });
  const { toast } = useToast();
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [state, setState] = useState<"idle" | "rejected" | "accepted">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<FormData | null>(null);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormData;
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      toast({ title: "Please complete the form", description: "A few fields need attention.", variant: "destructive" });
      return;
    }
    if (parsed.data.budget === "under-10k") {
      setState("rejected");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...parsed.data,
      source: "Nucleus Landing Page",
      requestedAt: new Date().toISOString(),
    };

    try {
      if (leadWebhookUrl) {
        const res = await fetch(leadWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`Lead webhook failed with ${res.status}`);
        }
      } else {
        console.warn("VITE_LEAD_WEBHOOK_URL is not configured. Lead was not sent to Google Sheets.");
      }

      setSubmittedLead(parsed.data);
      setState("accepted");
      toast({ title: "Application received", description: "We'll be in touch within 24 hours." });
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission issue",
        description: "We couldn't save your lead just now. Please retry in a few seconds.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="relative py-24 sm:py-32 md:py-40 overflow-hidden bg-background border-t border-border/40">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.span
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-heading font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8 }}
          >
            Pilot Application
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Apply for a completely <span className="text-primary">FREE Pilot Video.</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-sm sm:text-base text-muted-foreground max-w-2xl font-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We do not work with every agency. Please fill out the criteria below. If your volume needs align with our
            infrastructure, we'll edit your first video on the house so you can experience our speed directly.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 sm:mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0, 1] }}
        >
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                className="p-6 sm:p-10 rounded-2xl border border-border bg-card"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <Field label="Name" error={errors.name}>
                    <input className={inputCls} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" maxLength={100} />
                  </Field>
                  <Field label="Business Email" error={errors.email}>
                    <input type="email" className={inputCls} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@agency.com" maxLength={255} />
                  </Field>
                  <Field label="Phone / WhatsApp" error={errors.phone}>
                    <input className={inputCls} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98xxxxxxxx" maxLength={20} />
                  </Field>
                  <Field label="Agency Name / Website" error={errors.agency}>
                    <input className={inputCls} value={data.agency} onChange={(e) => update("agency", e.target.value)} placeholder="agency.com" maxLength={200} />
                  </Field>
                  <Field label="Coaching / Ed-tech clients managed" error={errors.clients}>
                    <select className={inputCls} value={data.clients} onChange={(e) => update("clients", e.target.value as FormData["clients"])}>
                      <option value="">Select…</option>
                      <option value="1-3">1 – 3</option>
                      <option value="4-10">4 – 10</option>
                      <option value="10+">10+</option>
                    </select>
                  </Field>
                  <Field label="Ad videos tested per month (all clients)" error={errors.videos}>
                    <select className={inputCls} value={data.videos} onChange={(e) => update("videos", e.target.value as FormData["videos"])}>
                      <option value="">Select…</option>
                      <option value="1-10">1 – 10</option>
                      <option value="11-30">11 – 30</option>
                      <option value="31-50">31 – 50</option>
                      <option value="50+">50+</option>
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Avg. monthly creative budget per coaching client" error={errors.budget}>
                      <select className={inputCls} value={data.budget} onChange={(e) => update("budget", e.target.value as FormData["budget"])}>
                        <option value="">Select…</option>
                        <option value="under-10k">Under ₹10k</option>
                        <option value="20-50k">₹20k – ₹50k</option>
                        <option value="50k+">₹50k+</option>
                      </select>
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Schedule a meeting after submitting?" error={errors.meeting}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => update("meeting", "yes")}
                          className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            data.meeting === "yes"
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          Yes, show meeting options
                        </button>
                        <button
                          type="button"
                          onClick={() => update("meeting", "no")}
                          className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            data.meeting === "no"
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          No, contact me later
                        </button>
                      </div>
                    </Field>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="magnetic-btn mt-8 sm:mt-10 w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-heading text-sm sm:text-base font-semibold tracking-wide hover:opacity-90 transition-all duration-300"
                  data-cursor-hover
                >
                  {isSubmitting ? "Sending..." : "Request My Pilot Video"}
                  <span className="text-lg leading-none">→</span>
                </button>
              </motion.form>
            )}

            {state === "accepted" && (
              <motion.div
                key="accepted"
                className="p-8 sm:p-12 rounded-2xl border border-primary/40 bg-card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mx-auto w-20 h-20">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute inset-0 rounded-full border border-primary/40"
                      initial={{ scale: 0.7, opacity: 0.7 }}
                      animate={{ scale: [0.7, 1.45], opacity: [0.7, 0] }}
                      transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity, ease: "easeOut" }}
                    />
                  ))}
                  <div className="relative mx-auto w-14 h-14 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-6 text-2xl sm:text-3xl font-heading font-bold text-foreground">You're in.</h3>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground font-body max-w-md mx-auto">
                  Our team will review your application and reach out within 24 hours to confirm your pilot brief.
                </p>
                {submittedLead?.meeting === "yes" && (
                  <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
                    <p className="text-sm text-foreground font-body">
                      Want to lock this faster? Book a quick strategy call now.
                    </p>
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="magnetic-btn mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-heading font-semibold tracking-wide hover:opacity-90 transition-opacity"
                      data-cursor-hover
                    >
                      Schedule Meeting on Calendly
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </motion.div>
            )}

            {state === "rejected" && (
              <motion.div
                key="rejected"
                className="p-8 sm:p-12 rounded-2xl border border-border bg-card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-heading">
                  Not the right fit — yet
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Our infrastructure is built for higher-volume accounts.
                </h3>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground font-body max-w-lg mx-auto leading-relaxed">
                  Based on your client budgets, our wholesale pricing wouldn't keep your margins healthy. When your
                  per-client creative budgets cross ₹20k+, come back — we'd love to work with you.
                </p>
                <button
                  onClick={() => { setState("idle"); setData(initial); }}
                  className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-primary font-heading hover:opacity-80 transition-opacity"
                  data-cursor-hover
                >
                  ← Edit application
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplyFormSection;
