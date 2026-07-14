"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

const ROW_H = 56; // px — category row height, also the indicator travel step

const CATS = [
  {
    n: "01",
    label: "Languages",
    items: ["Python", "C / C++", "Java", "JavaScript", "SQL"],
    note: "Daily drivers across computer vision, machine learning, and full-stack work.",
  },
  {
    n: "02",
    label: "Frameworks",
    items: ["React", "Node.js", "Express", "Tailwind CSS"],
    note: "Front to back on travelinggenie.com and the S.T.A.R. control app.",
  },
  {
    n: "03",
    label: "ML / Data",
    items: [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "PyTorch",
      "HF Transformers",
      "PEFT / QLoRA",
      "TRL",
      "BitsAndBytes",
      "sacrebleu",
    ],
    note: "QLoRA fine-tuning and full ablation studies on the UCF Newton GPU cluster.",
  },
  {
    n: "04",
    label: "Systems",
    items: ["Linux", "Git", "Nginx", "PM2", "Google Colab"],
    note: "Deploying and operating services on Linux VMs with Nginx and PM2.",
  },
  {
    n: "05",
    label: "Embedded",
    items: ["Raspberry Pi", "ESP32", "MSP430", "UART", "I2C", "PCA9685"],
    note: "Real-time vision and dual-axis servo control on the S.T.A.R. hardware.",
  },
];

export const TechnologiesSection = () => {
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const userTouched = useRef(false);
  const intervalRef = useRef(null);

  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const selectCat = (i) => {
    userTouched.current = true;
    stopAuto();
    setActive(i);
  };

  // Auto-cycle categories while the panel is on screen — until the user clicks.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            if (!intervalRef.current && !userTouched.current) {
              intervalRef.current = setInterval(() => {
                setActive((a) => (a + 1) % CATS.length);
              }, 3200);
            }
          } else {
            stopAuto();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopAuto();
    };
  }, []);

  // Stagger the tags (and fade the note) in whenever the active category changes.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.querySelectorAll("[data-skill-tag]").forEach((t, i) => {
      t.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 420, delay: i * 45, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" }
      );
    });
    const note = el.querySelector("[data-skill-note]");
    if (note) note.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: "ease" });
  }, [active]);

  const cat = CATS[active];

  return (
    <section id="skills" className="border-t-2 border-paper/[0.12]">
      <div className="mx-auto max-w-[1180px] px-6 py-[104px] md:px-[52px]">
        <div className="mb-10 text-[12px] font-medium uppercase tracking-[0.28em] text-brand-2">
          03 — Skills
        </div>

        <div className="grid grid-cols-1 items-start gap-[56px] md:grid-cols-[0.82fr_1.55fr]">
          {/* category rail */}
          <div className="relative border-l-2 border-paper/[0.14]">
            <div
              className="absolute left-[-2px] top-0 h-[56px] w-[2px] bg-brand-2"
              style={{
                transform: `translateY(${active * ROW_H}px)`,
                transition: "transform .42s cubic-bezier(.2,.7,.2,1)",
                boxShadow: "0 0 14px rgba(239,42,22,.8)",
              }}
            />
            {CATS.map((c, i) => {
              const on = i === active;
              return (
                <button
                  type="button"
                  key={c.label}
                  onClick={() => selectCat(i)}
                  className={cn(
                    "flex h-[56px] w-full cursor-pointer items-center gap-[14px] border-t border-paper/[0.12] bg-transparent pl-5 pr-1 text-left text-[21px] font-normal tracking-[-0.01em] transition-colors",
                    on ? "text-paper" : "text-paper/45"
                  )}
                >
                  <span
                    className={cn(
                      "w-6 text-[12px] font-semibold tracking-[0.08em] transition-colors",
                      on ? "text-brand-2" : "text-paper/35"
                    )}
                  >
                    {c.n}
                  </span>
                  <span className="flex-1">{c.label}</span>
                  <span
                    className={cn(
                      "text-[16px] text-brand-2 transition-opacity",
                      on ? "opacity-100" : "opacity-0"
                    )}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* active category panel */}
          <div ref={panelRef}>
            <div className="mb-[10px] flex items-baseline gap-4 border-t-2 border-brand-2/40 pt-[22px]">
              <h3 className="text-[34px] font-light leading-none tracking-[-0.02em] text-paper-bright">
                {cat.label}
              </h3>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-paper/45">
                {String(cat.items.length).padStart(2, "0")} skills
              </span>
            </div>
            <p
              data-skill-note
              className="mb-[26px] max-w-[56ch] text-[14.5px] leading-[1.6] text-paper/60"
            >
              {cat.note}
            </p>
            <div className="flex min-h-[96px] flex-wrap content-start gap-[10px]">
              {cat.items.map((item) => (
                <span
                  key={item}
                  data-skill-tag
                  className="cursor-default border border-paper/[0.22] px-[15px] py-[9px] text-[14px] font-semibold text-paper transition-colors hover:border-brand-2 hover:bg-brand/[0.14] hover:text-glow"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-[10px] text-[11px] uppercase tracking-[0.16em] text-paper/35">
              <span
                className="h-[7px] w-[7px] bg-brand-2"
                style={{ boxShadow: "0 0 8px rgba(239,42,22,.9)" }}
              />
              Auto-cycling — click a category to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
