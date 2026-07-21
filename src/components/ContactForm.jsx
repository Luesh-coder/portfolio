"use client";

import { useState } from "react";
import { cn } from "../lib/utils";

const FIELD_BASE =
  "w-full bg-transparent py-[14px] text-[18px] text-[#fdefec] placeholder:text-[#fff0ec]/45 " +
  "border-b border-[#fff0ec]/[0.22] outline-none transition-colors focus:border-[#fff0ec]/70";

// idle → sending → sent | error. Drives the button label and the status line.
export const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="mt-14 max-w-[640px]">
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={FIELD_BASE}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className={FIELD_BASE}
        />
      </div>

      <textarea
        name="message"
        required
        rows={4}
        maxLength={5000}
        placeholder="Tell me about the project…"
        className={cn(FIELD_BASE, "mt-2 resize-none")}
      />

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={sending}
          className={cn(
            "inline-flex items-center gap-[10px] bg-ink px-[26px] py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#fdefec] transition-colors hover:bg-ink-raise",
            sending && "cursor-not-allowed opacity-70"
          )}
        >
          {sending ? "Sending…" : "Send message →"}
        </button>

        {status === "sent" && (
          <span className="text-[15px] text-[#fdefec]">
            Thanks — your message is on its way.
          </span>
        )}
        {status === "error" && (
          <span className="text-[15px] text-[#fff0ec]/90" role="alert">
            {error}
          </span>
        )}
      </div>
    </form>
  );
};
