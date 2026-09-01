const segments = Array.from({ length: 56 }, (_, i) => i);
const ticks = Array.from({ length: 96 }, (_, i) => i);

export function TechVisual() {
  return (
    <div className="pointer-events-none relative aspect-square w-full select-none">
      {/* ambient radial light */}
      <div
        className="absolute inset-[-18%] -z-10 rounded-full opacity-100 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 52% 48%, oklch(0.56 0.222 296 / 48%), oklch(0.62 0.216 262 / 26%) 44%, transparent 68%)",
        }}
      />

      <svg
        viewBox="0 0 600 600"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Abstract visualization of a software delivery system: concentric rings with web, mobile, cloud and API nodes around a glowing core"
      >
        <defs>
          <linearGradient id="ak-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.216 262)" stopOpacity="0.95" />
            <stop offset="55%" stopColor="oklch(0.56 0.222 296)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.83 0.132 197)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="ak-faint" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.83 0.132 197)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.56 0.222 296)" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="ak-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.95 0.06 220)" stopOpacity="0.95" />
            <stop offset="38%" stopColor="oklch(0.66 0.2 262)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="oklch(0.4 0.18 288)" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="ak-inner-fill" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="oklch(0.32 0.1 272)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.14 0.03 264)" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* outer hairline rings */}
        <circle cx="300" cy="300" r="288" fill="none" stroke="url(#ak-faint)" strokeWidth="1" />
        <circle cx="300" cy="300" r="252" fill="none" stroke="url(#ak-stroke)" strokeWidth="1.25" strokeOpacity="0.7" />

        {/* segmented outer track */}
        <g className="orbit-slow">
          {segments.map((i) => {
            const angle = (i / segments.length) * 360;
            const long = i % 7 === 0;
            return (
              <rect
                key={i}
                x="299"
                y="24"
                width={long ? 3 : 2}
                height={long ? 22 : 11}
                rx="1"
                fill="url(#ak-stroke)"
                opacity={long ? 0.85 : 0.4}
                transform={`rotate(${angle} 300 300)`}
              />
            );
          })}
        </g>

        {/* fine tick ring */}
        <g className="orbit-reverse">
          {ticks.map((i) => (
            <rect
              key={i}
              x="299.5"
              y="76"
              width="1"
              height={i % 4 === 0 ? 8 : 4}
              fill="oklch(0.83 0.132 197)"
              opacity={i % 4 === 0 ? 0.5 : 0.22}
              transform={`rotate(${(i / ticks.length) * 360} 300 300)`}
            />
          ))}
        </g>

        {/* mid ring with arc highlights */}
        <circle cx="300" cy="300" r="196" fill="none" stroke="var(--hairline)" strokeWidth="1" />
        <g className="orbit-slow">
          <circle
            cx="300"
            cy="300"
            r="196"
            fill="none"
            stroke="url(#ak-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="150 470"
          />
          <circle
            cx="300"
            cy="300"
            r="196"
            fill="none"
            stroke="oklch(0.83 0.132 197)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="46 574"
            strokeDashoffset="300"
          />
        </g>

        {/* dashed orbit + travelling particles */}
        <circle
          cx="300"
          cy="300"
          r="150"
          fill="none"
          stroke="oklch(0.62 0.216 262)"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeDasharray="2 9"
        />
        <g className="orbit-reverse">
          <circle cx="300" cy="150" r="3" fill="oklch(0.83 0.132 197)" opacity="0.9" />
          <circle cx="450" cy="300" r="2" fill="oklch(0.62 0.216 262)" opacity="0.8" />
          <circle cx="300" cy="450" r="2.5" fill="oklch(0.56 0.222 296)" opacity="0.8" />
        </g>

        {/* elliptical orbit paths */}
        <ellipse
          cx="300"
          cy="300"
          rx="238"
          ry="96"
          fill="none"
          stroke="url(#ak-faint)"
          strokeWidth="1"
          transform="rotate(-22 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="238"
          ry="96"
          fill="none"
          stroke="url(#ak-faint)"
          strokeWidth="1"
          transform="rotate(28 300 300)"
        />

        {/* thin technical connector lines */}
        <g stroke="url(#ak-stroke)" strokeOpacity="0.35" strokeWidth="1">
          <path d="M300 104 V196" />
          <path d="M462 300 H404" />
          <path d="M300 496 V404" />
          <path d="M138 300 H196" />
        </g>

        {/* inner disc */}
        <circle cx="300" cy="300" r="118" fill="url(#ak-inner-fill)" stroke="var(--color-border)" strokeWidth="1" />
        <circle cx="300" cy="300" r="92" fill="none" stroke="url(#ak-stroke)" strokeWidth="1" strokeOpacity="0.5" />

        {/* minimal data / code elements inside the disc */}
        <g fill="oklch(0.83 0.132 197)" opacity="0.4">
          <rect x="244" y="228" width="42" height="3" rx="1.5" />
          <rect x="244" y="238" width="26" height="3" rx="1.5" />
          <rect x="318" y="366" width="38" height="3" rx="1.5" />
          <rect x="336" y="376" width="20" height="3" rx="1.5" />
        </g>

        {/* glowing core */}
        <g className="core-pulse">
          <circle cx="300" cy="300" r="66" fill="url(#ak-core)" />
          <circle cx="300" cy="300" r="30" fill="none" stroke="oklch(0.95 0.05 220)" strokeOpacity="0.55" strokeWidth="1" />
          <path
            d="M288 288 L276 300 L288 312 M312 288 L324 300 L312 312"
            fill="none"
            stroke="oklch(0.99 0.01 220)"
            strokeOpacity="0.85"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* subtle discipline nodes: web, mobile, cloud, API */}
        <g stroke="url(#ak-stroke)" strokeWidth="1.4" fill="none" opacity="0.75">
          {/* web */}
          <g transform="translate(276 66)">
            <rect x="0" y="0" width="48" height="34" rx="4" />
            <path d="M0 10 H48" />
            <circle cx="7" cy="5" r="1.4" fill="url(#ak-stroke)" stroke="none" />
          </g>
          {/* mobile */}
          <g transform="translate(486 282)">
            <rect x="0" y="0" width="26" height="40" rx="6" />
            <path d="M9 34 H17" />
          </g>
          {/* cloud */}
          <g transform="translate(272 500)">
            <path d="M10 24 A11 11 0 0 1 12 3 A14 14 0 0 1 38 8 A10 10 0 0 1 44 24 Z" />
          </g>
          {/* api */}
          <g transform="translate(70 284)">
            <path d="M18 4 L4 20 L18 36" />
            <path d="M40 4 L54 20 L40 36" />
            <path d="M32 2 L26 38" strokeOpacity="0.6" />
          </g>
        </g>

        {/* tiny particles */}
        <g fill="oklch(0.83 0.132 197)">
          {[
            [128, 168],
            [470, 158],
            [512, 420],
            [116, 428],
            [368, 92],
            [204, 512],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 1} opacity={i % 2 ? 0.45 : 0.7} />
          ))}
        </g>
      </svg>
    </div>
  );
}