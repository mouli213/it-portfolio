import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import SkillsTimelineSection from './components/SkillsTimelineSection';
import ContactFooter from './components/ContactFooter';
import FloatingRobotDock, {
  SECTION_INTROS,
  generateRobotReply,
  speakText,
} from './components/RobotCommunicator';

const SECTION_IDS = ['about', 'projects', 'skills-timeline', 'contact'];
const THEME_STORAGE_KEY = 'portfolio-theme-mode';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'dark';
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState('about');
  const [robotAnimState, setRobotAnimState] = useState('wave');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: SECTION_INTROS.about,
    },
  ]);

  const animTimerRef = useRef(null);

  // Sync theme attribute on <html> and persist preference
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  // Initial welcome wave settles smoothly into idle
  useEffect(() => {
    animTimerRef.current = setTimeout(() => {
      setRobotAnimState('idle');
    }, 2600);
    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, []);

  // Track active section as the user scrolls so the robot stays context-aware
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const triggerRobotAnimation = (state, durationMs = 2800) => {
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    setRobotAnimState(state);
    animTimerRef.current = setTimeout(() => {
      setRobotAnimState('idle');
    }, durationMs);
  };

  const handleSendMessage = (rawText) => {
    const clean = rawText.trim();
    if (!clean) return;

    const reply = generateRobotReply(clean);
    const now = Date.now();

    setMessages((prev) => [
      ...prev,
      { id: `u-${now}`, sender: 'user', text: clean },
      { id: `b-${now + 1}`, sender: 'bot', text: reply.text, scrollTo: reply.scrollTo },
    ]);

    triggerRobotAnimation(reply.anim || 'talk', 3200);
    speakText(reply.text, voiceEnabled);

    if (reply.scrollTo) {
      const target = document.getElementById(reply.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'wave') {
      const msg = "Hi there! Glad you stopped by—feel free to drag me around or ask me anything!";
      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, sender: 'bot', text: msg },
      ]);
      triggerRobotAnimation('wave', 2800);
      speakText(msg, voiceEnabled);
    }
  };

  const handleRobotClick = () => {
    handleQuickAction('wave');
  };

  const handleToggleVoice = () => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const latestSpeech =
    [...messages].reverse().find((m) => m.sender === 'bot')?.text || SECTION_INTROS.about;

  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-main)] transition-colors duration-400">
      <Navbar
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <main>
        <Hero
          theme={theme}
          robotAnimState={robotAnimState}
          currentSpeech={latestSpeech}
          onRobotClick={handleRobotClick}
          onSendMessage={handleSendMessage}
          onQuickAction={handleQuickAction}
          voiceEnabled={voiceEnabled}
          onToggleVoice={handleToggleVoice}
        />
        <ProjectsSection />
        <SkillsTimelineSection />
      </main>
      <ContactFooter />
      <FloatingRobotDock
        activeSection={activeSection}
        messages={messages}
        onSendMessage={handleSendMessage}
        onTriggerWave={() => handleQuickAction('wave')}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
      />
    </div>
  );
}
