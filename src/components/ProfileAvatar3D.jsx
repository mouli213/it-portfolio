import { useRef, useState } from 'react';
import profilePhoto from '../assets/profile-photo.jpg';
import { PROFILE } from '../data/portfolioData';

export default function ProfileAvatar3D({ size = 'hero' }) {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  const handleMouseMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -py * 18,
      ry: px * 18,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, active: false });
  };

  if (size === 'compact') {
    return (
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <span
          aria-hidden="true"
          className="animate-orbit-slow absolute inset-0 rounded-full border border-dashed border-[var(--accent-glow)]/65"
        />
        <span
          aria-hidden="true"
          className="animate-orbit-reverse absolute inset-0.5 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, var(--accent-glow), transparent 45%, var(--accent-secondary-bright) 75%, transparent 100%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 0)',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 0)',
          }}
        />
        <img
          src={profilePhoto}
          alt={PROFILE.name}
          className="relative h-8 w-8 rounded-full border border-[var(--border-strong)] object-cover object-top shadow-sm"
        />
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-stage group relative flex h-44 w-44 shrink-0 items-center justify-center select-none sm:h-48 sm:w-48"
      aria-label={`${PROFILE.name} futuristic portrait`}
    >
      <div
        className="animate-float-3d relative flex h-full w-full items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: tilt.active
            ? `perspective(900px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`
            : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Depth Layer -1: Ambient holographic aura */}
        <div
          aria-hidden="true"
          className="animate-holo-pulse absolute inset-2 rounded-full blur-xl"
          style={{
            transform: 'translateZ(-16px)',
            background:
              'radial-gradient(circle, var(--accent-glow) 0%, var(--accent-primary) 42%, transparent 74%)',
          }}
        />

        {/* Depth Layer 1: Outer orbital SVG telemetry ring + dual satellites */}
        <div
          aria-hidden="true"
          className="animate-orbit-slow pointer-events-none absolute inset-0"
          style={{ transform: 'translateZ(8px)' }}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="var(--accent-glow)"
              strokeOpacity="0.4"
              strokeWidth="1.2"
              strokeDasharray="6 6 2 6"
            />
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="var(--accent-secondary-bright)"
              strokeOpacity="0.32"
              strokeWidth="1"
              strokeDasharray="24 14 4 14"
            />
            {/* Glowing orbital nodes */}
            <circle cx="100" cy="5" r="3.6" fill="var(--accent-soft)" />
            <circle cx="100" cy="195" r="2.8" fill="var(--accent-secondary-bright)" />
          </svg>
        </div>

        {/* Depth Layer 2: Counter-rotating conic energy ring */}
        <div
          aria-hidden="true"
          className="animate-orbit-reverse pointer-events-none absolute inset-3 rounded-full"
          style={{
            transform: 'translateZ(18px)',
            background:
              'conic-gradient(from 40deg, var(--accent-glow) 0deg, transparent 70deg, var(--accent-secondary-bright) 170deg, transparent 240deg, var(--accent-soft) 320deg, transparent 360deg)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)',
          }}
        />

        {/* Depth Layer 3: Tilted inner gyroscopic accent arc */}
        <div
          aria-hidden="true"
          className="animate-orbit-fast pointer-events-none absolute inset-5 rounded-full border border-[var(--border-strong)]"
          style={{
            transform: 'translateZ(22px)',
            borderTopColor: 'var(--accent-soft)',
            borderRightColor: 'transparent',
            borderBottomColor: 'var(--accent-secondary-bright)',
            borderLeftColor: 'transparent',
          }}
        />

        {/* Depth Layer 4: Circular portrait core with holographic scan sweep */}
        <div
          className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-[var(--border-strong)] bg-[var(--bg-slate)] shadow-[0_18px_38px_-10px_rgba(0,0,0,0.65)] sm:h-36 sm:w-36"
          style={{ transform: 'translateZ(30px)' }}
        >
          <img
            src={profilePhoto}
            alt={`${PROFILE.name} — B.Tech IT Student`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Subtle futuristic vignette + inner rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20"
            style={{
              background:
                'radial-gradient(circle at 50% 35%, transparent 55%, rgba(2, 4, 3, 0.36) 100%)',
            }}
          />

          {/* Futuristic periodic light scan sweep */}
          <div
            aria-hidden="true"
            className="animate-scan-sweep pointer-events-none absolute -inset-x-6 top-0 h-10 bg-gradient-to-b from-transparent via-[var(--accent-soft)]/35 to-transparent blur-[2px]"
          />
        </div>

        {/* Depth Layer 5: Floating 3D telemetry pill */}
        <div
          className="absolute -bottom-1 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-[var(--text-main)] shadow-lg backdrop-blur-md"
          style={{ transform: 'translateZ(46px)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-glow)] animate-pulse" />
          <span>{PROFILE.initials.toUpperCase()} // IT</span>
        </div>
      </div>
    </div>
  );
}
