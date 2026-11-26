import { Layers, CalendarDays, Award, BookOpen, Users, Rocket } from 'lucide-react';
import { SKILL_GROUPS, TIMELINE } from '../data/portfolioData';
import Reveal from './Reveal';
import TiltCard3D from './TiltCard3D';

const LEVEL_STYLES = {
  Comfortable:
    'border-[var(--border-slate)] bg-[var(--accent-secondary)]/65 text-[var(--accent-secondary-bright)]',
  Building:
    'border-[var(--border-strong)] bg-[var(--accent-primary)]/25 text-[var(--accent-soft)]',
  Exploring:
    'border-[var(--border-subtle)] bg-[var(--bg-recessed)] text-[var(--text-secondary)]',
};

const TYPE_ICONS = {
  Education: BookOpen,
  Hackathon: Award,
  Community: Users,
  Milestone: Rocket,
};

export default function SkillsTimelineSection() {
  return (
    <section
      id="skills-timeline"
      className="relative overflow-hidden border-t border-[var(--border-subtle)] py-18 sm:py-24"
      style={{
        background:
          'linear-gradient(180deg, var(--bg-void) 0%, var(--bg-slate-deep) 50%, var(--bg-void) 100%)',
      }}
    >
      {/* 3D Perspective floor & volumetric side glows */}
      <div aria-hidden="true" className="perspective-floor opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -left-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary-bright), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Skills Matrix */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[var(--accent-secondary-bright)] uppercase">
                <Layers className="h-3.5 w-3.5" />
                Technical Toolkit
              </span>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--text-main)]">
                Skills &amp; Foundations
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Tools I use to build software alongside the core Information Technology subjects
                I&apos;m mastering in my coursework.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold">
                <span className={`rounded-full border px-2.5 py-0.5 ${LEVEL_STYLES.Comfortable}`}>
                  Comfortable
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 ${LEVEL_STYLES.Building}`}>
                  Building
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 ${LEVEL_STYLES.Exploring}`}>
                  Exploring
                </span>
              </div>
            </Reveal>

            <div className="perspective-stage mt-6 space-y-5">
              {SKILL_GROUPS.map((group, idx) => (
                <Reveal key={group.title} delay={idx * 75}>
                  <TiltCard3D
                    maxTilt={5.5}
                    className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 backdrop-blur-md hover:border-[var(--border-strong)]"
                  >
                    <div
                      className="depth-z-md flex flex-wrap items-baseline justify-between gap-2"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <h3 className="font-serif text-lg font-semibold text-[var(--text-main)]">
                        {group.title}
                      </h3>
                      <span className="text-xs text-[var(--text-muted)]">{group.subtitle}</span>
                    </div>

                    <div
                      className="depth-z-sm mt-3.5 flex flex-wrap gap-2"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {group.items.map((skill) => {
                        const badgeStyle =
                          LEVEL_STYLES[skill.level] || LEVEL_STYLES.Building;
                        return (
                          <div
                            key={skill.name}
                            className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-3 py-1.5 shadow-inner transition-transform duration-200 hover:-translate-y-0.5"
                          >
                            <span className="text-xs font-semibold text-[var(--text-main)]">
                              {skill.name}
                            </span>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeStyle}`}
                            >
                              {skill.level}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </TiltCard3D>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 3D Spatial Experience & Education Timeline */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[var(--accent-soft)] uppercase">
                <CalendarDays className="h-3.5 w-3.5" />
                Journey So Far
              </span>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--text-main)]">
                Education &amp; Experience Timeline
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Milestones across B.Tech IT coursework, hackathons, student communities, and
                hands-on building.
              </p>
            </Reveal>

            <div className="perspective-stage relative mt-8 space-y-6">
              {/* Glowing 3D vertical spine */}
              <div
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-5 w-0.5 rounded-full"
                style={{
                  background:
                    'linear-gradient(180deg, var(--accent-glow) 0%, var(--accent-secondary-bright) 55%, var(--border-subtle) 100%)',
                  boxShadow: '0 0 12px var(--accent-primary)',
                }}
              />

              {TIMELINE.map((entry, idx) => {
                const Icon = TYPE_ICONS[entry.type] || Rocket;
                return (
                  <Reveal key={entry.title} delay={idx * 85}>
                    <div className="relative pl-14">
                      {/* 3D Floating orbital node */}
                      <span
                        className="absolute top-1 left-0 flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--accent-primary)] text-[var(--accent-contrast-text)]"
                        style={{ boxShadow: '0 10px 24px -6px rgba(0, 0, 0, 0.55)' }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>

                      <TiltCard3D
                        maxTilt={5.5}
                        className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 backdrop-blur-md hover:border-[var(--border-strong)]"
                      >
                        <div
                          className="depth-z-md flex flex-wrap items-center justify-between gap-2"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-slate)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--text-main)]">
                            {entry.period}
                          </span>
                          <span className="text-xs font-semibold text-[var(--accent-secondary-bright)]">
                            {entry.type}
                          </span>
                        </div>

                        <h3 className="depth-z-lg mt-2.5 font-serif text-lg font-semibold text-[var(--text-main)]">
                          {entry.title}
                        </h3>
                        <p className="depth-z-sm text-xs font-semibold text-[var(--accent-soft)]">
                          {entry.organization}
                        </p>

                        <p className="depth-z-sm mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {entry.summary}
                        </p>

                        <div className="depth-z-md mt-3.5 flex flex-wrap gap-1.5">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TiltCard3D>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
