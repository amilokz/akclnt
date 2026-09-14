import { TechVisual } from "./TechVisual";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "100+", label: "Projects Shipped" },
  { value: "50+", label: "Happy Clients" },
  { value: "24h", label: "Avg. Response" },
];

// Companies. To use logos: import the image and set `logo`.
// e.g. import ezitechLogo from '../../assets/clients/ezitech.png';
// then: { name: 'Ezitech', logo: ezitechLogo }
const clients = [
  { name: "Ezitech", logo: null },
  { name: "SellHive", logo: null },
  { name: "SoftwayHub", logo: null },
];

function CountUp({ value, duration = 2600 })  {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf;
       const start = performance.now() + 400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{n}{suffix}</>;
}

// ============ PARTICLE LINES COMPONENT ============
function ParticleLines() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;
    let animationId;
    let particles = [];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 80;
    const MAX_SPEED = 3;
    const LINE_LENGTH = 120;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.length = LINE_LENGTH * (0.3 + Math.random() * 0.7);
        this.speed = 0.5 + Math.random() * MAX_SPEED;
        this.opacity = 0.05 + Math.random() * 0.2;
        this.width = 0.3 + Math.random() * 1.2;
      }
      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.005) * 0.3;
        if (this.y > height + this.length) {
          this.reset();
          this.y = -this.length;
        }
      }
      draw(ctx) {
        const gradient = ctx.createLinearGradient(this.x, this.y - this.length, this.x, this.y);
        const alpha = this.opacity;
        gradient.addColorStop(0, `rgba(91, 95, 239, ${alpha * 0.1})`);
        gradient.addColorStop(0.3, `rgba(91, 95, 239, ${alpha * 0.6})`);
        gradient.addColorStop(0.7, `rgba(139, 123, 247, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(0, 168, 150, ${alpha * 0.3})`);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.length);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.shadowColor = `rgba(91, 95, 239, ${alpha * 0.3})`;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 123, 247, ${alpha * 0.5})`;
        ctx.shadowColor = `rgba(91, 95, 239, ${alpha * 0.5})`;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ============ MAIN HERO ============
export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen" style={{ backgroundColor: "#06070C" }}>
      <div className="absolute inset-0 -z-30" style={{ backgroundColor: "#06070C" }} />

      <ParticleLines />

      <div className="absolute inset-0 -z-20 bg-grid opacity-30" />

      {/* Ambient color glows */}
      <div
        className="absolute -top-32 -left-24 w-[38rem] h-[38rem] rounded-full blur-3xl pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(91,95,239,0.18), transparent 60%)" }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] rounded-full blur-3xl pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(0,168,150,0.14), transparent 60%)" }}
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 62% 42%, transparent 32%, rgba(6,7,12,0.85) 78%, rgba(6,7,12,1) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pt-32 pb-20 lg:grid-cols-[46fr_54fr] lg:gap-10 lg:px-10 lg:pt-36 lg:pb-24">

        {/* ===== LEFT ===== */}
        <div className="max-w-xl">

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full pl-2.5 pr-4 py-1.5 animate-[fadeInUp_0.6s_ease_0.1s_both]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
            </span>
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.22em] text-white/70 uppercase">
              Available for new projects
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.7rem] text-white animate-words">
            <span>We</span>
            <span>turn</span>
            <span>ideas</span>
            <span>into</span>
            <span className="text-gradient">software</span>
            <span>that</span>
            <span className="text-gradient">ships.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-7 max-w-lg text-[1.02rem] leading-[1.75] font-medium text-white/60 animate-[fadeInUp_0.6s_ease_0.7s_both]">
            A software studio building websites, apps, and business systems for
            companies that need something that actually works — not just looks
            good in a pitch.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3 animate-[fadeInUp_0.6s_ease_0.9s_both]">
            <Link
              to="/contact"
              className="btn-primary rounded-full px-7 py-3.5 text-sm font-semibold group relative overflow-hidden"
            >
              <span className="inline-flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-full group-hover:opacity-0">
                Start a Project
                <span aria-hidden="true">↗</span>
              </span>
              <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-y-full group-hover:translate-y-0">
                Let's Build
                <span aria-hidden="true">→</span>
              </span>
            </Link>

            <Link
              to="/portfolio"
              className="btn-ghost rounded-full px-7 py-3.5 text-sm font-semibold group relative overflow-hidden"
            >
              <span className="inline-flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-full group-hover:opacity-0">
                See Our Work
                <span aria-hidden="true">→</span>
              </span>
              <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-y-full group-hover:translate-y-0">
                View Portfolio
                <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </div>

          {/* Stats strip (animated count-up) */}
          <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-7 animate-[fadeInUp_0.6s_ease_1.1s_both]">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                {i > 0 && <span className="h-8 w-px bg-white/10" />}
                <div>
                  <div className="font-display text-2xl font-bold text-white leading-none">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-white/45">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

                  {/* Trust line */}
          <div className="mt-9 animate-[fadeInUp_0.6s_ease_1.3s_both]">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-white/20" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-white/40 shrink-0">
                Worked with
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {clients.map((c) => (
                <div
                  key={c.name}
                  className="group flex items-center gap-2.5 rounded-full pl-3.5 pr-2 py-1.5 transition-colors duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  {c.logo && (
                    <img src={c.logo} alt={c.name} className="h-4 w-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                  )}
                  <span className="font-display text-[0.9rem] font-semibold text-white/70 group-hover:text-white transition-colors">
                    {c.name}
                  </span>
                  <span
                    className="font-mono text-[0.58rem] uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      color: c.role === "Client" ? "#00A896" : "#8B7BF7",
                      background: c.role === "Client" ? "rgba(0,168,150,0.12)" : "rgba(139,123,247,0.12)",
                    }}
                  >
                    {c.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== RIGHT — visual (no box, just glow) ===== */}
        <div className="relative lg:-mr-16 xl:-mr-28 animate-[fadeInUp_0.7s_ease_0.5s_both]">
          <div
            className="absolute inset-6 rounded-[2rem] blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 40%, rgba(91,95,239,0.25), transparent 65%)" }}
          />
          <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[620px]">
            <TechVisual />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 animate-[fadeInUp_0.6s_ease_1.4s_both]">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}