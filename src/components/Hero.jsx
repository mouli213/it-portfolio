import { useState } from 'react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  GraduationCap,
  Hand,
  Send,
  Volume2,
  VolumeX,
  Rotate3d,
  Compass,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import HeroRobot3D from './HeroRobot3D';
import TiltCard3D from './TiltCard3D';
import ProfileAvatar3D from './ProfileAvatar3D';

export default function Hero({
  theme = 'dark',
  robotAnimState,
  currentSpeech,
  onRobotClick,
  onSendMessage,
  onQuickAction,
  voiceEnabled,
  onToggleVoice,
}) {
  const [quickPrompt, setQuickPrompt] = useState('');

  const handleHeroAsk = (e) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    onSendMessage(quickPrompt);
    setQuickPrompt('');
  };

  return (
    <section
      id="about"
      className="studio-grid-bg relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28"
    >
      {/* 3D Perspective floor horizon & volumetric studio glows */}
      <div aria-hidden="true" className="perspective-floor" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-8 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 -left-24 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary-bright), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Left column: Futuristic Circular Photo, Intro & 3D Quick Fact Cards */}
        <div className="lg:col-span-6">
          <div className="mb-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ProfileAvatar3D size="hero" />

            <div className="flex-1">
              <div className="mb-3 inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm backdrop-blur-md">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-soft)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent-glow)] animate-pulse" />
                  {PROFILE.availability}
                </span>
                <span className="text-[var(--text-muted)]">•</span>
                <span>{PROFILE.yearBadge}</span>
              </div>

              <h1 className="font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-[var(--text-main)] sm:text-5xl">
                Hi, I&apos;m{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(120deg, var(--text-main) 0%, var(--accent-soft) 50%, var(--accent-glow) 100%)',
                  }}
                >
                  {PROFILE.name}
                </span>
                .
              </h1>
            </div>
          </div>

          <p className="font-serif text-xl leading-snug font-medium text-[var(--text-main)]/95 sm:text-2xl">
            {PROFILE.headline}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {PROFILE.bio}
          </p>
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
            {PROFILE.aboutExtra}
          </p>

          {/* Primary 3D CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="btn-3d inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast-text)] hover:bg-[var(--accent-primary-hover)]"
            >
              Explore 3D Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#skills-timeline"
              className="btn-3d inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] px-5 py-3 text-sm font-semibold text-[var(--text-main)] backdrop-blur-md hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
            >
              <Compass className="h-4 w-4 text-[var(--accent-glow)]" />
              Skills & Journey
            </a>
          </div>

          {/* 3D Extruded Quick Facts Grid */}
          <div className="perspective-stage mt-8 grid grid-cols-2 gap-3.5">
            {PROFILE.quickFacts.map((fact) => (
              <TiltCard3D
                key={fact.label}
                maxTilt={6}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 backdrop-blur-md"
              >
                <span className="depth-z-sm block font-mono text-[10px] font-semibold tracking-wider text-[var(--accent-soft)] uppercase">
                  {fact.label}
                </span>
                <span className="depth-z-md mt-1 block text-sm font-semibold text-[var(--text-main)]">
                  {fact.value}
                </span>
              </TiltCard3D>
            ))}
          </div>

          {/* Social links */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)]">
              <GraduationCap className="h-3.5 w-3.5 text-[var(--accent-glow)]" />
              {PROFILE.college}
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
          </div>
        </div>

        {/* Right column: Multi-plane Interactive 3D Robot Stage & Live Communicator */}
        <div className="perspective-stage lg:col-span-6">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-[var(--border-strong)] p-4 sm:p-6"
            style={{
              background:
                'linear-gradient(155deg, var(--bg-slate) 0%, var(--bg-carbon) 55%, var(--bg-void) 100%)',
              boxShadow: 'var(--shadow-3d-stage)',
            }}
          >
            {/* Subtle interior 3D radial aura behind Aura */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, var(--accent-glow) 0%, var(--accent-secondary-bright) 50%, transparent 75%)',
              }}
            />

            {/* Top HUD bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1 text-[11px] font-semibold text-[var(--text-main)] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-secondary-bright)] animate-pulse" />
                Aura 3D Companion
                <span className="font-mono text-[10px] text-[var(--accent-soft)] uppercase">
                  [{robotAnimState}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1 font-mono text-[10px] text-[var(--text-muted)] sm:inline-flex">
                  <Rotate3d className="h-3.5 w-3.5 text-[var(--accent-glow)]" />
                  Drag 360° • Click to greet
                </span>
                <button
                  type="button"
                  onClick={onToggleVoice}
                  title={voiceEnabled ? 'Mute voice output' : 'Enable voice output'}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    voiceEnabled
                      ? 'border-[var(--accent-glow)] bg-[var(--accent-primary)] text-[var(--accent-contrast-text)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                  }`}
                >
                  {voiceEnabled ? (
                    <Volume2 className="h-3.5 w-3.5" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5" />
                  )}
                  Voice
                </button>
              </div>
            </div>

            {/* Live Robot Speech Bubble */}
            <div className="relative z-10 mt-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 shadow-lg backdrop-blur-md">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast-text)] shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <p className="text-xs leading-relaxed font-medium text-[var(--text-main)] sm:text-sm">
                  {currentSpeech}
                </p>
              </div>
            </div>

            {/* 3D WebGL Canvas */}
            <div className="relative z-10 -my-2">
              <HeroRobot3D
                theme={theme}
                animationState={robotAnimState}
                onRobotClick={onRobotClick}
              />
            </div>

            {/* Quick Interactive Robot Controls + Direct Chat Input */}
            <div className="relative z-10 space-y-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 shadow-lg backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onQuickAction('wave')}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--accent-primary)]/30 px-3 py-1 text-[11px] font-semibold text-[var(--accent-soft)] transition-colors hover:bg-[var(--accent-primary)] hover:text-[var(--accent-contrast-text)]"
                >
                  <Hand className="h-3 w-3" />
                  Wave
                </button>
                {[
                  { label: 'Projects', prompt: 'Show me your projects' },
                  { label: 'IT Skills', prompt: 'What are your skills?' },
                  { label: 'Education', prompt: 'Tell me about your education' },
                  { label: 'Celebrate', prompt: 'Celebrate!' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onSendMessage(item.prompt)}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-3 py-1 text-[11px] font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-main)]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleHeroAsk} className="flex items-center gap-2">
                <input
                  type="text"
                  value={quickPrompt}
                  onChange={(e) => setQuickPrompt(e.target.value)}
                  placeholder={`Ask Aura about ${PROFILE.name} (e.g., "What projects have you built?")`}
                  className="flex-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-4 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-3d inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-[var(--accent-contrast-text)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Ask
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
