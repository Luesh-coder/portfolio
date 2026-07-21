import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";
// import { ImageSlot } from "./ImageSlot";

const STATS = [
  { label: "Based in", value: "Orlando, FL" },
  { label: "Studying", value: "B.S. → M.S. CpE" },
  { label: "Open to", value: "SWE / ML roles" },
];
 
export const AboutSection = () => {
    return (
    <section id="about" className="border-t-2 border-paper/[0.12]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-[64px] px-6 py-[104px] md:grid-cols-[0.85fr_1.15fr] md:px-[52px]">
        <Reveal
          className="relative aspect-[4/5] w-full"
          style={{ filter: "grayscale(1) contrast(1.05)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/Headshot.png"
            alt="Lucio Villena"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mb-[22px] text-[12px] font-medium uppercase tracking-[0.28em] text-brand-2">
            01 — About
          </div>
          <h2 className="mb-[26px] text-[44px] font-light leading-[1.06] tracking-[-0.008em] text-paper">
            Engineer across the stack — from silicon to the browser.
                </h2>
          <p className="mb-[18px] max-w-[60ch] text-[16.5px] leading-[1.66] text-paper/[0.66]">
            I&apos;m a Computer Engineering student at the University of Central
            Florida (GPA 3.62), graduating May 2026 and continuing into a
            master&apos;s. My work runs from real-time computer vision on
            embedded hardware to LLM fine-tuning pipelines and full-stack web
            applications.
          </p>

          <div className="grid grid-cols-3 border-t-2 border-paper/[0.14]">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "pt-5",
                  i === 0 && "pr-5",
                  i === 1 && "border-l-2 border-paper/[0.14] px-5",
                  i === 2 && "border-l-2 border-paper/[0.14] pl-5"
                )}
              >
                <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-paper/45">
                  {s.label}
                </div>
                <div className="text-[15px] font-semibold">{s.value}</div>
              </div>
            ))}
          </div>
        </Reveal>
            </div>
        </section>
    );
};