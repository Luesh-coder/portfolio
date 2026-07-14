import { Reveal } from "./Reveal";

export const EducationSection = () => {
  return (
    <section id="education" className="border-t-2 border-paper/[0.12]">
      <div className="mx-auto max-w-[1180px] px-6 py-[104px] md:px-[52px]">
        <div className="mb-[34px] text-[12px] font-medium uppercase tracking-[0.28em] text-brand-2">
          04 — Education
        </div>

        {/* M.S. */}
        <Reveal className="grid grid-cols-1 items-baseline gap-6 border-t-2 border-brand-2/40 py-7 sm:grid-cols-[1fr_auto]">
          <div>
            <div className="text-[24px] font-normal tracking-[-0.02em]">
              University of Central Florida{" "}
              <span className="text-[18px] font-semibold text-paper/50">— Orlando, FL</span>
            </div>
            <div className="mt-2 text-[15px] font-bold tracking-[0.02em] text-brand-2">
              M.S. Computer Engineering — Student
            </div>
          </div>
          <div className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.14em] text-paper/50">
            2026 — Present
          </div>
        </Reveal>

        {/* B.S. */}
        <Reveal className="grid grid-cols-1 items-baseline gap-6 border-t border-paper/[0.14] py-7 sm:grid-cols-[1fr_auto]">
          <div>
            <div className="text-[24px] font-normal tracking-[-0.02em]">
              University of Central Florida{" "}
              <span className="text-[18px] font-semibold text-paper/50">— Orlando, FL</span>
            </div>
            <div className="mt-2 text-[15px] font-semibold">
              B.S. Computer Engineering &nbsp;·&nbsp;{" "}
              <span className="text-paper/60">GPA 3.62</span>
            </div>
            <p className="mt-[14px] max-w-[64ch] text-[14px] leading-[1.6] text-paper/55">
              Relevant coursework: Data Structures &amp; Algorithms I / II,
              Algorithms for Machine Learning, Object-Oriented Programming &amp;
              Development, Computer Organization, Embedded Systems.
            </p>
          </div>
          <div className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.14em] text-paper/50">
            May 2026
          </div>
        </Reveal>

        <Reveal className="mt-[2px] border-t border-paper/[0.14] pt-[22px] text-[13.5px] text-paper/55">
          <span className="mr-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-brand-2">
            Honors
          </span>
          Dean&apos;s / President&apos;s List — multiple terms.
        </Reveal>
      </div>
    </section>
  );
};
