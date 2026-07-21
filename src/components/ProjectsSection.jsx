import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";
// import { ImageSlot } from "./ImageSlot";

const GitHubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);

const GitHubLink = ({ href, children = "GitHub", small }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={cn(
      "inline-flex items-center gap-[8px] border-b-2 border-brand-2/60 pb-1 font-bold text-paper no-underline transition-colors hover:border-brand-2 hover:text-glow",
      small ? "gap-[8px] text-[12.5px] tracking-[0.04em]" : "gap-[9px] text-[13px] tracking-[0.04em]"
    )}
  >
    <GitHubIcon size={small ? 14 : 15} />
    {children}
  </a>
);

const Chip = ({ children, small }) => (
  <span
    className={cn(
      "border border-paper/20 font-medium uppercase",
      small
        ? "px-[10px] py-[5px] text-[10.5px] tracking-[0.05em] text-paper/70"
        : "px-[11px] py-[6px] text-[11px] tracking-[0.05em] text-paper/[0.72]"
    )}
  >
    {children}
  </span>
);

const Bullet = ({ children, small }) => (
  <li
    className={cn(
      "relative",
      small
        ? "pl-[18px] text-[13.5px] leading-[1.5] text-paper/[0.58]"
        : "pl-[20px] text-[14.5px] leading-[1.55] text-paper/[0.62]"
    )}
  >
    <span className={cn("absolute left-0 text-brand-2", !small && "top-[1px]")}>→</span>
    {children}
  </li>
);

const STAR_STATS = [
  { value: "15–30", unit: "", label: "FPS real-time" },
  { value: "392", unit: "ms", label: "End-to-end latency" },
  { value: "7.5", unit: "m", label: "Detection range" },
  { value: "77", unit: "%", label: "Avg confidence" },
];

const PROJECTS = [
  {
    eyebrow: "02 · Machine Learning",
    title: "Recipe Generation via QLoRA Fine-Tuning",
    desc: "Fine-tuned Google's Gemma 2B-it on Food.com recipes with 4-bit QLoRA across three LoRA ranks (r = 4, 16, 64), trained on the UCF Newton GPU cluster via SLURM.",
    bullets: [
      "Full ablation vs. zero-shot & TF-IDF KNN baselines, scored on ROUGE-1/2/L.",
      "Modular pipeline: Paged AdamW 8-bit, cosine schedule, interactive inference CLI.",
    ],
    tags: ["Gemma 2B", "PyTorch", "PEFT / QLoRA", "HuggingFace"],
    repo: "https://github.com/TakiTyler/DeepLearningProject",
  },
  {
    eyebrow: "03 · Full-Stack",
    title: "travelinggenie.com — AI Trip Planner",
    desc: "A full-stack platform that turns structured user inputs into personalized itineraries with the Gemini LLM — React front end, Node/Express back end, MongoDB.",
    bullets: [
      "RESTful auth & itinerary CRUD on indexed MongoDB; deployed to a Linux VM with Nginx + PM2.",
      "Built in a 7-developer Agile team with Git branching, PRs, and code reviews.",
    ],
    tags: ["React", "Node / Express", "MongoDB", "Gemini API"],
    repo: "https://github.com/jermachong/COP4331_LP",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="work" className="border-t-2 border-paper/[0.12]">
      <div className="mx-auto max-w-[1180px] px-6 py-[104px] md:px-[52px]">
        <div className="mb-[34px] text-[12px] font-medium uppercase tracking-[0.28em] text-brand-2">
          02 — Selected Work
        </div>

        {/* Featured: S.T.A.R. */}
        <Reveal className="mb-[72px] border-t-2 border-brand-2/40 pt-8">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4">
            <span className="bg-brand px-3 py-[6px] text-[11px] font-bold uppercase tracking-[0.1em] text-white">
              1st Place — UCF CREOL Senior Design Showcase
            </span>
            <span className="text-[12px] uppercase tracking-[0.16em] text-paper/45">
              Featured Project
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 items-start gap-[56px] md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h3 className="mb-[6px] text-[52px] font-light leading-[0.98] tracking-[-0.03em] text-paper-bright">
                S.T.A.R.
              </h3>
              <div className="mb-5 text-[15px] tracking-[0.04em] text-paper/55">
                Spotlight Tracking Automated Recognition
              </div>
              <p className="mb-7 max-w-[52ch] text-[16px] leading-[1.62] text-paper/[0.66]">
                A real-time computer-vision pipeline that detects and localizes a
                human subject, then drives a dual-axis servo gimbal to keep a
                spotlight locked on target — end to end, on embedded hardware.
              </p>

              <div className="mb-7 grid grid-cols-4 border-t-2 border-paper/[0.14]">
                {STAR_STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "pt-[18px]",
                      i === 0 && "pr-[14px]",
                      i > 0 && i < 3 && "border-l-2 border-paper/[0.14] px-[14px]",
                      i === 3 && "border-l-2 border-paper/[0.14] pl-[14px]"
                    )}
                  >
                    <div className="text-[30px] font-normal tracking-[-0.02em] text-brand-2">
                      {s.value}
                      {s.unit && <span className="text-[15px]">{s.unit}</span>}
                    </div>
                    <div className="mt-[6px] text-[10.5px] uppercase tracking-[0.12em] text-paper/50">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <ul className="mb-[26px] flex list-none flex-col gap-3 p-0">
                <Bullet>
                  YOLO26n on a Raspberry Pi CM5 detecting subjects across a &gt;45°
                  FOV; system latency held below the 500 ms requirement.
                </Bullet>
                <Bullet>
                  Low-latency UART (up to 1 Mbps) streaming coordinates to an
                  ESP32-S3 driving a PCA9685 gimbal — 180° pan / 120° tilt.
                </Bullet>
                <Bullet>
                  React Native app for manual override, calibration, and live
                  telemetry over WebSocket.
                </Bullet>
              </ul>

              <div className="mb-6 flex flex-wrap gap-2">
                {["Raspberry Pi CM5", "ESP32-S3", "YOLO26n", "Python", "C/C++", "React Native"].map(
                  (t) => (
                    <Chip key={t}>{t}</Chip>
                  )
                )}
              </div>

              <GitHubLink href="https://github.com/Luesh-coder/S.T.A.R.-Software" />
            </div>

            <div className="relative aspect-[4/3] w-full">
              {/* <ImageSlot label="Drop a S.T.A.R. demo frame" /> */}
            </div>
          </div>
        </Reveal>

        {/* Secondary projects */}
        <div className="grid grid-cols-1 gap-[48px] md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="border-t-2 border-paper/[0.14] pt-[26px]">
              <div className="mb-[14px] text-[12px] uppercase tracking-[0.14em] text-paper/40">
                {p.eyebrow}
              </div>
              <h3 className="mb-3 text-[26px] font-normal leading-[1.1] tracking-[-0.02em] text-paper-bright">
                {p.title}
              </h3>
              <p className="mb-[18px] text-[14.5px] leading-[1.6] text-paper/[0.64]">
                {p.desc}
              </p>
              <ul className="mb-5 flex list-none flex-col gap-[10px] p-0">
                {p.bullets.map((b) => (
                  <Bullet key={b} small>
                    {b}
                  </Bullet>
                ))}
              </ul>
              <div className="mb-5 flex flex-wrap gap-[7px]">
                {p.tags.map((t) => (
                  <Chip key={t} small>
                    {t}
                  </Chip>
                ))}
              </div>
              <GitHubLink href={p.repo} small />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
