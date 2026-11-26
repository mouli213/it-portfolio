import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import ProfileAvatar3D from './ProfileAvatar3D';

const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills-timeline', label: 'Skills & Timeline', href: '#skills-timeline' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar({
  activeSection = 'about',
  theme = 'dark',
  onToggleTheme,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl transition-colors duration-400">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a
          href="#about"
          className="group flex items-center gap-3 text-[var(--text-main)] focus:outline-none"
        >
          <ProfileAvatar3D size="compact" />
          <div className="leading-tight">
            <span className="block font-serif text-base font-semibold tracking-tight">
              {PROFILE.name}
            </span>
            <span className="block text-xs text-[var(--text-muted)]">
              B.Tech IT • 3D Portfolio
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive
                    ? 'font-semibold text-[var(--text-main)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--accent-soft)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute right-0 -bottom-1.5 left-0 h-0.5 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--accent-glow), var(--accent-secondary-bright))',
                    }}
                  />
                )}
              </a>
            );
          })}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to opposite light mode' : 'Switch to obsidian dark mode'}
            title={isDark ? 'Switch to Opposite Light Mode' : 'Switch to Obsidian Dark Mode'}
            className="btn-3d inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-slate)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-glow)]"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[var(--accent-glow)]" />
                <span>Dark</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="btn-3d inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-[var(--accent-contrast-text)] hover:bg-[var(--accent-primary-hover)]"
          >
            Say Hello
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to opposite light mode' : 'Switch to obsidian dark mode'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-slate)] text-[var(--text-main)]"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-[var(--accent-soft)]" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--accent-glow)]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-carbon)] text-[var(--text-main)]"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Smooth scroll progress indicator */}
      <div className="h-0.5 w-full bg-transparent">
        <div
          className="h-full transition-[width] duration-150"
          style={{
            width: `${scrollProgress}%`,
            background:
              'linear-gradient(90deg, var(--accent-primary), var(--accent-glow), var(--accent-secondary-bright))',
          }}
        />
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-carbon)] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-base font-medium text-[var(--text-main)] transition-colors hover:bg-[var(--bg-slate)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
