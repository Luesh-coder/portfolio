"use client";

import { useEffect, useRef } from "react";
import { RESUME_URL } from "../lib/constants";

// Tuning ported from the design's DCLogic props (Motion section).
const MOTION_SPEED = 1.3; // ×
const DENSITY = { c: 28, r: 24 }; // 'Medium'

/**
 * Retro-wave hero backdrop rendered on a <canvas>: a perspective grid "net"
 * rolling toward the camera, a geometric rising sun with rotating spokes, and a
 * twinkling starfield above the horizon. Reacts to pointer position for a
 * subtle parallax. Ported 1:1 from the Claude Design source.
 */
function drawNet(ctx, w, h, t, mouse) {
  ctx.clearRect(0, 0, w, h);
  const m = mouse;
  const sp = MOTION_SPEED;
  const D = DENSITY;
  const tt = t * sp;
  const hy = h * 0.46;

  // starfield (above the horizon only)
  for (const s of drawNet.stars) {
    if (s.y * h > hy - 4) continue;
    const a = 0.22 + 0.5 * Math.abs(Math.sin(t * 0.001 + s.tw));
    ctx.fillStyle = "rgba(255,220,214," + (a * 0.5).toFixed(3) + ")";
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.r, 0, 6.29);
    ctx.fill();
  }

  // geometric sun rising behind the net
  const sunR = Math.min(w, h) * 0.24 * (1 + Math.sin(tt * 0.0009) * 0.02);
  const sunX = w * 0.64 + m.x * 28;
  const sunY = hy - sunR * 0.62;
  const glow = ctx.createRadialGradient(sunX, sunY, sunR * 0.05, sunX, sunY, sunR * 1.2);
  glow.addColorStop(0, "rgba(210,26,14,0.18)");
  glow.addColorStop(1, "rgba(210,26,14,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR * 1.2, 0, 6.29);
  ctx.fill();
  ctx.lineWidth = 1;
  for (let k = 1; k <= 4; k++) {
    ctx.strokeStyle = "rgba(240,44,26," + (0.5 - k * 0.085).toFixed(3) + ")";
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR * (k / 4), 0, 6.29);
    ctx.stroke();
  }
  const rot = tt * 0.00012;
  const spokes = 48;
  for (let k = 0; k < spokes; k++) {
    const a = rot + (k / spokes) * 6.283;
    const inner = sunR * 0.6;
    const outer = sunR * (0.95 + 0.08 * Math.sin(k * 3 + tt * 0.001));
    ctx.strokeStyle = "rgba(240,58,38," + (k % 2 ? 0.48 : 0.2).toFixed(3) + ")";
    ctx.beginPath();
    ctx.moveTo(sunX + Math.cos(a) * inner, sunY + Math.sin(a) * inner);
    ctx.lineTo(sunX + Math.cos(a) * outer, sunY + Math.sin(a) * outer);
    ctx.stroke();
  }

  // perspective grid
  const cols = D.c;
  const rows = D.r;
  const camY = 1.3;
  const fov = h * 0.98;
  const cx = w * 0.5 + m.x * 40;
  const step = 0.42;
  const zoff = (tt * 0.0009) % step;
  const P = [];
  for (let j = 0; j <= rows; j++) {
    const row = [];
    const wz = 0.5 + j * step - zoff;
    for (let i = 0; i <= cols; i++) {
      const wx = (i / cols - 0.5) * 8.6;
      const y =
        Math.sin(wx * 0.6 + tt * 0.0011) * 0.22 +
        Math.sin(wz * 0.7 - tt * 0.0016) * 0.34 +
        Math.cos((wx + wz) * 0.5 + tt * 0.0008) * 0.12 +
        m.y * 0.45 * Math.exp(-Math.abs(wx) * 0.32);
      const persp = fov / wz;
      row.push({ x: cx + wx * persp, y: hy + (camY - y) * persp });
    }
    P.push(row);
  }
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    for (let j = 0; j <= rows; j++) {
      const p = P[j][i];
      if (j === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "rgba(150,14,9,0.22)";
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    const df = 1 - j / rows;
    ctx.beginPath();
    for (let i = 0; i <= cols; i++) {
      const p = P[j][i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle =
      "rgba(" +
      Math.round(150 + 95 * df) +
      "," +
      Math.round(12 + 30 * df) +
      "," +
      Math.round(8 + 14 * df) +
      "," +
      (0.16 + 0.62 * df).toFixed(3) +
      ")";
    ctx.lineWidth = 0.7 + df * 1.5;
    ctx.stroke();
  }
  // bright horizon line
  ctx.strokeStyle = "rgba(240,44,26,0.85)";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(0, hy);
  ctx.lineTo(w, hy);
  ctx.stroke();
  ctx.globalCompositeOperation = "source-over";
}
drawNet.stars = Array.from({ length: 150 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.3 + 0.25,
  tw: Math.random() * 6.28,
}));

export const HeroSection = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const onResize = () => size();
    window.addEventListener("resize", onResize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // honour reduced-motion: paint a single static frame, no animation loop
      drawNet(ctx, w, h, 0, mouseRef.current);
    } else {
      const t0 = performance.now();
      const loop = (now) => {
        drawNet(ctx, w, h, now - t0, mouseRef.current);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    };
  };

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-[92vh] overflow-hidden bg-ink"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {/* readability gradients: fade the net out toward the text and the bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,#0a0605 0%,#0a0605 26%,rgba(10,6,5,.72) 46%,transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(0deg,#0a0605 0%,transparent 26%)" }}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[1180px] flex-col px-6 pb-[48px] pt-[104px] md:px-[52px]">
        <div className="mt-auto max-w-[660px]">
          <div className="mb-[22px] text-[13px] font-medium uppercase tracking-[0.32em] text-brand-2">
            SWE&nbsp;&nbsp;·&nbsp;&nbsp;ML Engineer
          </div>
          <h1 className="mb-6 text-balance text-[clamp(64px,9vw,116px)] font-light leading-[0.88] tracking-[-0.006em] text-paper-bright">
            LUCIO
            <br />
            VILLENA
          </h1>
          <p className="mb-[34px] max-w-[520px] text-[18px] leading-[1.55] text-paper/[0.66]">
            Computer Engineering @ UCF. I build real-time computer-vision
            systems, LLM fine-tuning pipelines, and full-stack products.
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href="#work"
              className="inline-flex items-center gap-[9px] bg-brand px-[24px] py-[15px] text-[13px] font-semibold uppercase tracking-[0.06em] text-white no-underline transition-colors hover:bg-brand-hover"
            >
              View work&nbsp;&nbsp;→
            </a>
            <a
              href={RESUME_URL}
              download
              className="inline-flex items-center gap-[9px] border-2 border-paper/[0.28] px-[22px] py-[13px] text-[13px] font-semibold uppercase tracking-[0.06em] text-paper no-underline transition-colors hover:border-brand-2 hover:text-glow"
            >
              Résumé ↓
            </a>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t-2 border-brand-2/30 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50">
          <span>01 / Selected work — S.T.A.R.</span>
          <span>Scroll ↓</span>
        </div>
      </div>
    </section>
  );
};
