import { TechVisual } from "./TechVisual";
import { useEffect, useRef } from "react";

const avatars = [
  "linear-gradient(135deg, #5B5FEF, #8B7BF7)",
  "linear-gradient(135deg, #00A896, #5B5FEF)",
  "linear-gradient(135deg, #8B7BF7, #5B5FEF)",
];

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

    // ===== PARTICLE CONFIGURATION =====
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
        this.angle = (Math.random() - 0.5) * 0.15; // slight curve
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.005) * 0.3;

        // Reset when off screen
        if (this.y > height + this.length) {
          this.reset();
          this.y = -this.length;
        }
      }

      draw(ctx) {
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y - this.length,
          this.x,
          this.y
        );

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

        // Glow dot at bottom
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 123, 247, ${alpha * 0.5})`;
        ctx.shadowColor = `rgba(91, 95, 239, ${alpha * 0.5})`;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
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
    <section
      className="relative overflow-hidden min-h-screen"
      style={{
        backgroundColor: "#06070C",
        background: "#06070C",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 -z-30" style={{ backgroundColor: "#06070C" }} />

      {/* ✅ PARTICLE LINES — upar se neeche */}
      <ParticleLines />

      {/* Grid background */}
      <div className="absolute inset-0 -z-20 bg-grid opacity-30" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 62% 42%, transparent 32%, rgba(6,7,12,0.85) 78%, rgba(6,7,12,1) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pt-32 pb-20 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:px-10 lg:pt-36 lg:pb-24">
        <div className="max-w-xl">
 <div className="flex items-center gap-3 overflow-hidden">
    <span className="h-px w-8 bg-signal/70 shrink-0" />
    <div className="overflow-hidden">
        <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-white/60 uppercase animate-words-badge-loop">
            <span>Software</span>
            <span>&amp;</span>
            <span>Web</span>
            <span>Development</span>
            <span>Studio</span>
        </p>
    </div>
</div>

 <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.65rem] text-white animate-words">
    <span>We</span>
    <span>turn</span>
    <span>ideas</span>
    <span>into</span>
    <span className="text-gradient">software</span>
    <span>that</span>
    <span className="text-gradient">ships.</span>
</h1>

<p className="mt-7 max-w-lg text-[1.02rem] leading-[1.75] font-medium text-white/60 animate-[fadeInUp_0.6s_ease_0.7s_both]">
    Akclnt builds websites, apps, and business systems for companies that need
    something that actually works — not just looks good in a pitch.
</p>

<div className="mt-10 flex flex-wrap items-center gap-3 animate-[fadeInUp_0.6s_ease_0.9s_both]">
    {/* Start a Project - Flap Effect */}
    <a
        href="#"
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
    </a>
    
    {/* ✅ See Our Work - Same Flap Effect */}
    <a
        href="#"
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
    </a>
</div>

          <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-7">
            <div className="flex shrink-0 -space-x-2.5">
              {avatars.map((bg, i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full ring-2 ring-[#06070C]"
                  style={{ backgroundImage: bg }}
                />
              ))}
            </div>
            <p className="min-w-0 text-sm leading-relaxed text-white/60">
              Trusted by retail, real-estate, and training businesses.
            </p>
          </div>
        </div>

        <div className="relative lg:-mr-16 xl:-mr-28">
          <div className="mx-auto w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[620px]">
            <TechVisual />
          </div>
        </div>
      </div>
    </section>
  );
}