/**
 * CyberDecorations — Futuristic ambient SVG overlays
 *
 * 1. HologramNode  — right side floating AI brain/network mesh
 * 2. HUDScanner    — left side rotating concentric radar rings
 * 3. AICoreBadge   — pulsing microchip icon for the header area
 *
 * All elements are pointer-events-none, absolutely positioned,
 * and hidden on small screens to keep the layout clean.
 */

/* ───────────────────────────────────────────
   1. Right-Side AI Hologram Node
   ─────────────────────────────────────────── */
   export function HologramNode() {
   return (
    <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none">
      <div className="animate-slow-float">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          className="animate-holo-pulse"
        >
          {/* Outer hexagonal frame */}
          <polygon
            points="110,10 200,55 200,165 110,210 20,165 20,55"
            fill="none"
            stroke="rgba(92,225,230,0.15)"
            strokeWidth="1"
          />
          <polygon
            points="110,30 185,65 185,155 110,190 35,155 35,65"
            fill="none"
            stroke="rgba(92,225,230,0.1)"
            strokeWidth="0.5"
            strokeDasharray="4 3"
            className="animate-data-stream"
          />

          {/* Neural network nodes */}
          {/* Central core */}
          <circle cx="110" cy="110" r="8" fill="rgba(92,225,230,0.3)" stroke="rgba(92,225,230,0.5)" strokeWidth="1.5" />
          <circle cx="110" cy="110" r="3" fill="#5ce1e6" />

          {/* Orbital nodes */}
          <circle cx="110" cy="55" r="4" fill="rgba(92,225,230,0.25)" stroke="rgba(92,225,230,0.4)" strokeWidth="1" />
          <circle cx="160" cy="80" r="4" fill="rgba(92,225,230,0.25)" stroke="rgba(92,225,230,0.4)" strokeWidth="1" />
          <circle cx="160" cy="140" r="4" fill="rgba(92,225,230,0.25)" stroke="rgba(92,225,230,0.4)" strokeWidth="1" />
          <circle cx="110" cy="165" r="4" fill="rgba(92,225,230,0.25)" stroke="rgba(92,225,230,0.4)" strokeWidth="1" />
          <circle cx="60" cy="140" r="4" fill="rgba(92,225,230,0.25)" stroke="rgba(92,225,230,0.4)" strokeWidth="1" />
          <circle cx="60" cy="80" r="4" fill="rgba(92,225,230,0.25)" stroke="rgba(92,225,230,0.4)" strokeWidth="1" />

          {/* Secondary outer nodes */}
          <circle cx="135" cy="42" r="2.5" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.8" />
          <circle cx="180" cy="110" r="2.5" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.8" />
          <circle cx="135" cy="178" r="2.5" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.8" />
          <circle cx="85" cy="178" r="2.5" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.8" />
          <circle cx="40" cy="110" r="2.5" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.8" />
          <circle cx="85" cy="42" r="2.5" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.8" />

          {/* Connections — core to orbital */}
          <line x1="110" y1="102" x2="110" y2="59" stroke="rgba(92,225,230,0.2)" strokeWidth="0.8" />
          <line x1="117" y1="105" x2="156" y2="83" stroke="rgba(92,225,230,0.2)" strokeWidth="0.8" />
          <line x1="117" y1="115" x2="156" y2="137" stroke="rgba(92,225,230,0.2)" strokeWidth="0.8" />
          <line x1="110" y1="118" x2="110" y2="161" stroke="rgba(92,225,230,0.2)" strokeWidth="0.8" />
          <line x1="103" y1="115" x2="64" y2="137" stroke="rgba(92,225,230,0.2)" strokeWidth="0.8" />
          <line x1="103" y1="105" x2="64" y2="83" stroke="rgba(92,225,230,0.2)" strokeWidth="0.8" />

          {/* Connections — orbital to secondary */}
          <line x1="110" y1="51" x2="135" y2="44" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="110" y1="51" x2="85" y2="44" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="160" y1="80" x2="180" y2="110" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="160" y1="140" x2="180" y2="110" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="110" y1="169" x2="135" y2="178" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="110" y1="169" x2="85" y2="178" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="60" y1="140" x2="40" y2="110" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="60" y1="80" x2="40" y2="110" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Cross connections — orbital ring */}
          <line x1="110" y1="55" x2="160" y2="80" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />
          <line x1="160" y1="80" x2="160" y2="140" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />
          <line x1="160" y1="140" x2="110" y2="165" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />
          <line x1="110" y1="165" x2="60" y2="140" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />
          <line x1="60" y1="140" x2="60" y2="80" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />
          <line x1="60" y1="80" x2="110" y2="55" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />

          {/* Inner pulsing ring */}
          <circle
            cx="110" cy="110" r="22"
            fill="none"
            stroke="rgba(92,225,230,0.12)"
            strokeWidth="0.5"
            strokeDasharray="3 5"
            className="animate-spin-slow-reverse"
            style={{ transformOrigin: '110px 110px' }}
          />

          {/* Data label */}
          <text x="110" y="205" textAnchor="middle" fill="rgba(92,225,230,0.2)" fontSize="7" fontFamily="Orbitron, sans-serif" letterSpacing="3">
            NEURAL MESH
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   2. Left-Side Tech HUD Scanner
   ─────────────────────────────────────────── */
export function HUDScanner() {
  return (
    <div className="absolute left-[-50px] top-1/3 -translate-y-1/2 hidden lg:block pointer-events-none select-none">
      <div className="relative w-[200px] h-[200px]">
        {/* Outermost ring — slow clockwise */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          className="absolute inset-0 animate-spin-slow"
        >
          <circle cx="100" cy="100" r="95" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="95" stroke="rgba(92,225,230,0.15)" strokeWidth="1" strokeDasharray="6 8 2 8" />
          {/* Tick marks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10) * (Math.PI / 180);
            const x1 = 100 + 90 * Math.cos(angle);
            const y1 = 100 + 90 * Math.sin(angle);
            const x2 = 100 + (i % 3 === 0 ? 84 : 87) * Math.cos(angle);
            const y2 = 100 + (i % 3 === 0 ? 84 : 87) * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={i % 3 === 0 ? 'rgba(92,225,230,0.2)' : 'rgba(92,225,230,0.08)'}
                strokeWidth={i % 3 === 0 ? '1' : '0.5'}
              />
            );
          })}
        </svg>

        {/* Middle ring — slow counter-clockwise */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          className="absolute inset-0 animate-spin-slow-reverse"
        >
          <circle cx="100" cy="100" r="70" stroke="rgba(92,225,230,0.1)" strokeWidth="0.8" strokeDasharray="4 6" />
          {/* Quadrant arcs */}
          <path d="M 100 30 A 70 70 0 0 1 170 100" stroke="rgba(92,225,230,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 100 170 A 70 70 0 0 1 30 100" stroke="rgba(92,225,230,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* Inner ring — static dashed */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          className="absolute inset-0"
        >
          <circle cx="100" cy="100" r="45" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="20" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" />

          {/* Crosshairs */}
          <line x1="100" y1="55" x2="100" y2="75" stroke="rgba(92,225,230,0.1)" strokeWidth="0.5" />
          <line x1="100" y1="125" x2="100" y2="145" stroke="rgba(92,225,230,0.1)" strokeWidth="0.5" />
          <line x1="55" y1="100" x2="75" y2="100" stroke="rgba(92,225,230,0.1)" strokeWidth="0.5" />
          <line x1="125" y1="100" x2="145" y2="100" stroke="rgba(92,225,230,0.1)" strokeWidth="0.5" />

          {/* Center dot */}
          <circle cx="100" cy="100" r="3" fill="rgba(92,225,230,0.3)" />
          <circle cx="100" cy="100" r="1.5" fill="#5ce1e6" />
        </svg>

        {/* Scanner sweep — rotating cone */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          className="absolute inset-0 animate-spin-slow"
          style={{ animationDuration: '8s' }}
        >
          <defs>
            <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(92,225,230,0)" />
              <stop offset="100%" stopColor="rgba(92,225,230,0.15)" />
            </linearGradient>
          </defs>
          <path
            d="M 100 100 L 100 15 A 85 85 0 0 1 155 30 Z"
            fill="url(#sweepGrad)"
          />
        </svg>

        {/* Label */}
        <div className="absolute bottom-[-12px] left-0 right-0 text-center">
          <span className="font-heading text-[7px] text-[#5ce1e6]/20 tracking-[3px]">HUD SCAN</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   3. AI Core Badge — Header microchip icon
   ─────────────────────────────────────────── */
export function AICoreBadge() {
  return (
    <div className="relative w-11 h-11 animate-core-glow rounded-xl bg-transparent flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {/* Chip body */}
        <rect x="7" y="7" width="14" height="14" rx="2" fill="rgba(92,225,230,0.08)" stroke="#5ce1e6" strokeWidth="1" />
        {/* Inner die */}
        <rect x="10" y="10" width="8" height="8" rx="1" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.4)" strokeWidth="0.5" />
        {/* Core dot */}
        <circle cx="14" cy="14" r="1.5" fill="#5ce1e6" />

        {/* Pins — top */}
        <line x1="10" y1="7" x2="10" y2="3" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="14" y1="7" x2="14" y2="3" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="18" y1="7" x2="18" y2="3" stroke="#5ce1e6" strokeWidth="0.8" />
        {/* Pins — bottom */}
        <line x1="10" y1="21" x2="10" y2="25" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="14" y1="21" x2="14" y2="25" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="18" y1="21" x2="18" y2="25" stroke="#5ce1e6" strokeWidth="0.8" />
        {/* Pins — left */}
        <line x1="7" y1="10" x2="3" y2="10" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="7" y1="14" x2="3" y2="14" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="7" y1="18" x2="3" y2="18" stroke="#5ce1e6" strokeWidth="0.8" />
        {/* Pins — right */}
        <line x1="21" y1="10" x2="25" y2="10" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="21" y1="14" x2="25" y2="14" stroke="#5ce1e6" strokeWidth="0.8" />
        <line x1="21" y1="18" x2="25" y2="18" stroke="#5ce1e6" strokeWidth="0.8" />

        {/* Pin terminators */}
        <circle cx="10" cy="2.5" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="14" cy="2.5" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="18" cy="2.5" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="10" cy="25.5" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="14" cy="25.5" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="18" cy="25.5" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="2.5" cy="10" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="2.5" cy="14" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="2.5" cy="18" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="25.5" cy="10" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="25.5" cy="14" r="0.8" fill="#5ce1e6" opacity="0.5" />
        <circle cx="25.5" cy="18" r="0.8" fill="#5ce1e6" opacity="0.5" />
      </svg>
    </div>
  );
}
