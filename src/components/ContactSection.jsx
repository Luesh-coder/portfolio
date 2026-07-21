import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { RESUME_URL } from "../lib/constants";

const LINKS = [
  { label: "luciovillena7@gmail.com", href: "mailto:luciovillena7@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucio-ruben-villena-97b6b6289/",
    external: true,
  },
  { label: "GitHub", href: "https://github.com/Luesh-coder", external: true },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="bg-crimson">
      <div className="mx-auto max-w-[1180px] px-6 py-[100px] md:px-[52px]">
        <Reveal className="mb-[30px] text-[12px] font-medium uppercase tracking-[0.28em] text-[#fff0ec]/[0.72]">
          05 — Contact
        </Reveal>

        <Reveal
          as="h2"
          delay={0.06}
          className="mb-12 max-w-[15ch] text-balance text-[clamp(48px,7vw,84px)] font-light leading-[0.96] tracking-[-0.03em] text-[#fdefec]"
        >
          Let&apos;s build something that ships.
        </Reveal>

        <Reveal
          delay={0.12}
          className="grid grid-cols-1 border-b-2 border-t-2 border-b-[#fff0ec]/[0.22] border-t-[#fff0ec]/35 sm:grid-cols-3"
        >
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={cn(
                "flex items-center justify-between gap-3 py-[22px] text-[20px] tracking-[-0.01em] text-[#fdefec] no-underline transition-colors hover:text-white",
                i === 0 && "sm:pr-[26px]",
                i === 1 && "sm:border-l-2 sm:border-[#fff0ec]/[0.22] sm:px-[26px]",
                i === 2 && "sm:border-l-2 sm:border-[#fff0ec]/[0.22] sm:pl-[26px]",
                i > 0 && "border-t border-[#fff0ec]/[0.22] sm:border-t-0"
              )}
            >
              {l.label}
              <span className="text-[16px]">↗</span>
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.18}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.24}>
          <a
            href="docs/Resume_Lucio_Ruben_Villena.pdf"
            download
            className="mt-10 inline-flex items-center gap-[10px] bg-ink px-[26px] py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#fdefec] no-underline transition-colors hover:bg-ink-raise"
          >
            Download résumé ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
};
