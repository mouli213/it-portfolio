import { useState } from 'react';
import {
  ExternalLink,
  Github,
  FolderGit2,
  ArrowUpRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/portfolioData';
import Reveal from './Reveal';
import TiltCard3D from './TiltCard3D';

const ACCENT_STYLES = {
  terracotta: {
    badge:
      'border-[var(--border-strong)] bg-[var(--accent-primary)]/20 text-[var(--accent-soft)]',
    strip: 'linear-gradient(90deg, var(--accent-primary), var(--accent-glow), var(--accent-soft))',
  },
  sage: {
    badge:
      'border-[var(--border-slate)] bg-[var(--accent-secondary)]/55 text-[var(--accent-secondary-bright)]',
    strip:
      'linear-gradient(90deg, var(--accent-secondary-bright), var(--accent-glow))',
  },
  amber: {
    badge:
      'border-[var(--border-strong)] bg-[var(--accent-secondary)]/45 text-[var(--accent-soft)]',
    strip:
      'linear-gradient(90deg, var(--accent-glow), var(--accent-secondary-bright))',
  },
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-[var(--border-subtle)] py-18 sm:py-24"
      style={{
        background:
          'linear-gradient(180deg, var(--bg-slate-deep) 0%, var(--bg-void) 55%, var(--bg-slate-deep) 100%)',
      }}
    >
      {/* 3D Perspective floor & atmospheric glow */}
      <div aria-hidden="true" className="perspective-floor opacity-75" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 h-80 w-[34rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[var(--accent-secondary-bright)] uppercase">
                <FolderGit2 className="h-3.5 w-3.5" />
                3D Project Showcase
              </span>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--text-main)] sm:text-4xl">
                Projects I&apos;ve Built &amp; Learned From
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Interactive multi-plane 3D cards showcasing campus platforms, CS visualizers, and
                practical full-stack applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
              {PROJECT_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`btn-3d rounded-full px-4 py-2 text-xs font-semibold sm:text-sm ${
                      isActive
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast-text)]'
                        : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 3D Tilt Project Cards Grid */}
        <div className="perspective-stage mt-10 grid gap-7 md:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const accent = ACCENT_STYLES[project.accent] || ACCENT_STYLES.terracotta;
            return (
              <Reveal key={project.id} delay={index * 75}>
                <TiltCard3D
                  maxTilt={6.5}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 backdrop-blur-md hover:border-[var(--border-strong)] sm:p-7"
                >
                  <div
                    className="absolute top-0 left-0 h-1.5 w-full"
                    style={{ background: accent.strip }}
                  />

                  <div style={{ transformStyle: 'preserve-3d' }}>
                    <div className="depth-z-md flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${accent.badge}`}
                      >
                        {project.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {project.github && project.github !== '#' && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            className="rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-slate)] hover:text-[var(--text-main)]"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.demo && project.demo !== '#' && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} live demo`}
                            className="rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-slate)] hover:text-[var(--text-main)]"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="depth-z-lg mt-4 font-serif text-xl font-semibold text-[var(--text-main)] sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="depth-z-sm mt-2 text-sm font-medium text-[var(--accent-soft)]">
                      {project.tagline}
                    </p>
                    <p className="depth-z-sm mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {project.description}
                    </p>

                    <div className="depth-z-md mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-3.5 py-2.5 text-xs font-medium text-[var(--accent-secondary-bright)] shadow-inner">
                      Highlight: {project.highlight}
                    </div>
                  </div>

                  <div
                    className="depth-z-md mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-4"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-slate)] px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--text-secondary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-soft)] transition-colors hover:text-[var(--accent-secondary-bright)]"
                    >
                      Case Study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TiltCard3D>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Interactive 3D Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="perspective-stage relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-carbon)] p-6 sm:p-8"
            style={{ boxShadow: 'var(--shadow-3d-stage)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
              className="btn-3d absolute top-5 right-5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-slate)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-main)]"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="font-mono text-xs font-semibold text-[var(--accent-secondary-bright)] uppercase">
              {selectedProject.category}
            </span>
            <h3
              id="project-modal-title"
              className="mt-1.5 pr-10 font-serif text-2xl font-semibold text-[var(--text-main)]"
            >
              {selectedProject.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {selectedProject.description}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] p-4 shadow-inner">
                <h4 className="text-xs font-semibold tracking-wide text-[var(--accent-soft)] uppercase">
                  The Problem
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {selectedProject.details?.problem}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] p-4 shadow-inner">
                <h4 className="text-xs font-semibold tracking-wide text-[var(--accent-secondary-bright)] uppercase">
                  What I Built
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {selectedProject.details?.solution}
                </p>
              </div>

              {selectedProject.details?.learned?.length > 0 && (
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] p-4 shadow-inner">
                  <h4 className="text-xs font-semibold tracking-wide text-[var(--text-main)] uppercase">
                    Key Takeaways
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {selectedProject.details.learned.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-secondary-bright)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-5">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-slate)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {selectedProject.github && selectedProject.github !== '#' && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-3d inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-[var(--accent-contrast-text)] hover:bg-[var(--accent-primary-hover)]"
                >
                  <Github className="h-3.5 w-3.5" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
