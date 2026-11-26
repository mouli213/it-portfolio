import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import Reveal from './Reveal';
import TiltCard3D from './TiltCard3D';
import ProfileAvatar3D from './ProfileAvatar3D';

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi ${PROFILE.name},\n\n${formState.message}\n\nBest,\n${formState.name}\n(${formState.email})`
    );
    setSubmitted(true);
    window.open(`mailto:${PROFILE.email}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[var(--border-subtle)] pt-18 pb-10"
      style={{
        background:
          'linear-gradient(180deg, var(--bg-slate-deep) 0%, var(--bg-void) 100%)',
      }}
    >
      <div aria-hidden="true" className="perspective-floor opacity-80" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="perspective-stage">
            <TiltCard3D
              maxTilt={2.8}
              className="grid gap-8 rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-6 backdrop-blur-xl sm:p-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-5" style={{ transformStyle: 'preserve-3d' }}>
                <div className="depth-z-md mb-4 flex items-center gap-3.5">
                  <ProfileAvatar3D size="compact" />
                  <div>
                    <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-secondary-bright)] uppercase">
                      Get in Touch
                    </span>
                    <p className="text-xs text-[var(--text-muted)]">{PROFILE.name}</p>
                  </div>
                </div>

                <h2 className="depth-z-lg mt-2 font-serif text-3xl font-semibold text-[var(--text-main)]">
                  Let&apos;s build something remarkable together.
                </h2>
                <p className="depth-z-sm mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Whether it&apos;s a summer internship opportunity, a hackathon team-up, or talking
                  about web dev, 3D UI, and DSA—my inbox is always open.
                </p>

                <div className="depth-z-md mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] p-4 shadow-inner">
                  <span className="block text-[11px] font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                    Direct Email
                  </span>
                  <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-[var(--text-main)] sm:text-sm">
                      {PROFILE.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-slate)] px-3 py-1 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[var(--accent-secondary-bright)]" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="depth-z-md mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-3.5 py-2 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-3.5 py-2 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-3.5 py-2 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--accent-soft)]"
                  >
                    <Mail className="h-4 w-4" />
                    Mail
                  </a>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="depth-z-md space-y-4 lg:col-span-7"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Riya Patel"
                      className="mt-1.5 w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] shadow-inner focus:border-[var(--accent-glow)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="riya@example.com"
                      className="mt-1.5 w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] shadow-inner focus:border-[var(--accent-glow)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[var(--text-secondary)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, hackathon, or internship opportunity..."
                    className="mt-1.5 w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-4 py-3 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] shadow-inner focus:border-[var(--accent-glow)] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="btn-3d inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-contrast-text)] hover:bg-[var(--accent-primary-hover)]"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                  {submitted && (
                    <span className="text-xs font-medium text-[var(--accent-secondary-bright)]">
                      Opening your email client with the draft ready!
                    </span>
                  )}
                </div>
              </form>
            </TiltCard3D>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-[var(--text-muted)] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} • B.Tech Information Technology (2nd Year)
          </p>
          <p>
            Built with React, Three.js, Vite &amp; Tailwind CSS • Customize in{' '}
            <code className="rounded border border-[var(--border-subtle)] bg-[var(--bg-carbon)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--text-main)]">
              src/data/portfolioData.js
            </code>
          </p>
        </div>
      </div>
    </footer>
  );
}
