"use client";

/**
 * Contact — real input types, real autocomplete, real labels (no floating hack),
 * designed focus rings, inline validation, calm success/error states.
 * Per ui-ux-pro-max checklist + brand.md voice (errors as direction, not apology).
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { DUR, EASE } from "@/lib/motion";

type Status = "idle" | "sending" | "ok" | "error";

const SERVICE_OPTIONS = [
  "AI Automation",
  "Social Media",
  "Website Development",
  "Mobile App",
  "WhatsApp Automation",
  "Digital Marketing",
  "Tech Consulting",
  "Not sure yet",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(formEl);
    const payload = {
      name:    String(form.get("name")    ?? "").trim(),
      email:   String(form.get("email")   ?? "").trim(),
      phone:   String(form.get("phone")   ?? "").trim(),
      service: String(form.get("service") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMsg("Please add your name, email, and a short message — that's all we need to reply.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      formEl.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something blocked the send. Try again in a moment, or email support@techupservices.com directly.");
    }
  }

  return (
    <section id="talk" className="relative bg-surface-base" aria-label="Talk to us">
      <div className="container-page pt-section-t pb-section-b">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-s7">
          {/* Left column — invitation */}
          <div className="md:col-span-5">
            <div className="eyebrow">Talk</div>
            <h2 className="mt-s4 text-fs-h2 font-display font-bold text-ink-strong">
              Tell us what you&apos;re trying to{" "}
              <span className="text-brand-gradient">unblock.</span>
            </h2>
            <p className="mt-s5 text-fs-body-lg text-ink-body max-w-prose">
              A short message is enough. We reply within one business day with
              a real human, a clarifying question or two, and a calendar link
              if the brief sounds like a fit.
            </p>

            <ul className="mt-s7 space-y-s4 text-fs-body text-ink-body">
              <li>
                <span className="eyebrow block mb-s1">Email</span>
                <a href="mailto:support@techupservices.com" className="text-ink-strong border-b border-surface-line hover:border-ink-strong transition-colors duration-fast">
                  support@techupservices.com
                </a>
              </li>
              <li>
                <span className="eyebrow block mb-s1">Phone</span>
                <a href="tel:+918237447244" className="text-ink-strong border-b border-surface-line hover:border-ink-strong transition-colors duration-fast">
                  +91 82374 47244
                </a>
              </li>
              <li>
                <span className="eyebrow block mb-s1">WhatsApp</span>
                <a href="https://wa.me/918237447244" target="_blank" rel="noopener noreferrer" className="text-ink-strong border-b border-surface-line hover:border-ink-strong transition-colors duration-fast">
                  Open WhatsApp chat
                </a>
              </li>
            </ul>
          </div>

          {/* Right column — form */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-s4 content-start"
            aria-busy={status === "sending"}
          >
            <Field
              label="Your name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Priya Sharma"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="priya@company.com"
            />
            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 …"
            />
            <SelectField
              label="What's the need?"
              name="service"
              options={SERVICE_OPTIONS}
            />
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-s2 text-fs-caption font-medium text-ink-strong">
                Message <span className="text-ink-faint">(required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="A sentence or two about what you're trying to ship, automate, or unblock."
                className="input-field resize-y min-h-[140px] font-body"
              />
            </div>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-s4 mt-s2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary disabled:opacity-60 disabled:cursor-wait"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={16} />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status === "ok" && (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DUR.base, ease: EASE.standard }}
                    className="inline-flex items-center gap-s2 text-fs-body text-ink-strong"
                    role="status"
                  >
                    <Check size={16} />
                    Sent. We&apos;ll reply within one business day.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DUR.base, ease: EASE.standard }}
                    className="inline-flex items-start gap-s2 text-fs-body text-ink-strong"
                    role="alert"
                  >
                    <AlertCircle size={16} className="mt-[2px] flex-none" />
                    <span>{errorMsg}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* -------- field primitives -------- */

type FieldProps = {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal" | "search" | "url";
  placeholder?: string;
};

function Field({ label, name, type, required, autoComplete, inputMode, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block mb-s2 text-fs-caption font-medium text-ink-strong">
        {label} {required && <span className="text-ink-faint">(required)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className="input-field font-body"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-s2 text-fs-caption font-medium text-ink-strong">
        {label}
      </label>
      <select id={name} name={name} className="input-field font-body" defaultValue="">
        <option value="" disabled>Pick one</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
