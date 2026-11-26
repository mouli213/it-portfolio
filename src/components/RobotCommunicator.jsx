import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  MessageSquare,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Hand,
  ArrowDown,
} from 'lucide-react';
import { PROFILE, PROJECTS, SKILL_GROUPS, TIMELINE } from '../data/portfolioData';

export const SECTION_INTROS = {
  about: `Hi! I'm Aura, ${PROFILE.name}'s 3D studio assistant. Drag me to rotate 360°, click me to wave, or ask me anything about this portfolio!`,
  projects:
    'Here are the featured B.Tech IT projects! Click any card to inspect the full case study.',
  'skills-timeline':
    'Check out the technical stack—from Java, C++, and React to core IT subjects like DBMS, OS, and Computer Networks.',
  contact:
    'Ready to collaborate on a hackathon or internship? You can copy the email in one click or send a message right here!',
};

export function generateRobotReply(rawInput) {
  const q = rawInput.trim().toLowerCase();

  if (!q) {
    return {
      text: `Hello! Ask me about ${PROFILE.name}'s projects, IT skills, education timeline, or contact info!`,
      anim: 'wave',
    };
  }

  if (/\b(hi|hello|hey|greet|wave|who are you|your name)\b/.test(q)) {
    return {
      text: `Hey there! I'm Aura, ${PROFILE.name}'s interactive 3D guide. ${PROFILE.name} is a ${PROFILE.yearBadge} ${PROFILE.role}. How can I help you explore today?`,
      anim: 'wave',
    };
  }

  if (/\b(project|projects|work|built|portfolio|app|apps)\b/.test(q)) {
    const names = PROJECTS.slice(0, 4).map((p) => p.title.split('—')[0].trim());
    return {
      text: `There are ${PROJECTS.length} featured projects showcased right now: ${names.join(', ')}. Click "Case Study" on any card to inspect the full breakdown!`,
      anim: 'talk',
      scrollTo: 'projects',
    };
  }

  if (/\b(skill|skills|tech|stack|language|java|react|dbms|dsa|python|c\+\+)\b/.test(q)) {
    const summary = SKILL_GROUPS.map(
      (g) => `${g.title}: ${g.items.slice(0, 3).map((i) => i.name).join(', ')}`
    ).join(' | ');
    return {
      text: `Here's the toolkit — ${summary}. Currently exploring: ${PROFILE.currentlyLearning.join(', ')}.`,
      anim: 'talk',
      scrollTo: 'skills-timeline',
    };
  }

  if (/\b(timeline|experience|education|college|year|semester|hackathon|degree)\b/.test(q)) {
    const latest = TIMELINE[0];
    return {
      text: `${PROFILE.name} is studying ${PROFILE.role} (${PROFILE.yearBadge}) at ${PROFILE.college}. Latest milestone: ${latest.title} (${latest.period}).`,
      anim: 'talk',
      scrollTo: 'skills-timeline',
    };
  }

  if (/\b(contact|email|hire|intern|internship|github|linkedin|reach)\b/.test(q)) {
    return {
      text: `You can reach ${PROFILE.name} directly at ${PROFILE.email}, or connect via GitHub and LinkedIn in the Contact section below!`,
      anim: 'wave',
      scrollTo: 'contact',
    };
  }

  if (/\b(celebrate|dance|spin|cool|awesome|nice)\b/.test(q)) {
    return {
      text: 'Thank you! Doing a happy victory cheer for you!',
      anim: 'celebrate',
    };
  }

  return {
    text: `Great question! Try asking about ${PROFILE.name}'s "projects", "skills", "education timeline", or "contact info".`,
    anim: 'talk',
  };
}

export function speakText(text, enabled) {
  if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.03;
    utter.pitch = 1.12;
    window.speechSynthesis.speak(utter);
  } catch {
    // Ignore browser speech errors gracefully
  }
}

export default function FloatingRobotDock({
  activeSection,
  messages,
  onSendMessage,
  onTriggerWave,
  voiceEnabled,
  onToggleVoice,
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setShowFloatingBubble(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  if (!showFloatingBubble && !open) return null;

  const latestBotMsg =
    [...messages].reverse().find((m) => m.sender === 'bot')?.text ||
    SECTION_INTROS[activeSection] ||
    SECTION_INTROS.about;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 sm:right-7 sm:bottom-7">
      {open ? (
        <div
          className="w-[min(92vw,370px)] overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-carbon)] backdrop-blur-xl"
          style={{ boxShadow: 'var(--shadow-3d-stage)' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3 text-[var(--accent-contrast-text)]"
            style={{
              background:
                'linear-gradient(120deg, var(--accent-primary) 0%, var(--bg-slate) 100%)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/25 text-[var(--accent-soft)] ring-1 ring-white/25">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wide">Aura • 3D Portfolio Guide</p>
                <p className="font-mono text-[10px] opacity-85">
                  Active Section: {activeSection.replace('-', ' ')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onToggleVoice}
                title={voiceEnabled ? 'Mute voice output' : 'Enable robot voice'}
                className="rounded-full p-1.5 opacity-80 transition-colors hover:bg-white/15 hover:opacity-100"
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Minimize robot assistant"
                className="rounded-full p-1.5 opacity-80 transition-colors hover:bg-white/15 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="max-h-72 space-y-2.5 overflow-y-auto bg-[var(--bg-recessed)] p-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast-text)]'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.scrollTo && (
                    <a
                      href={`#${msg.scrollTo}`}
                      onClick={() => setOpen(false)}
                      className="mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[var(--accent-secondary-bright)] hover:underline"
                    >
                      Jump to section
                      <ArrowDown className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] bg-[var(--bg-carbon)] px-3.5 py-2">
            {['Projects', 'IT Skills', 'Education', 'Contact'].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => onSendMessage(chip)}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-main)]"
              >
                {chip}
              </button>
            ))}
            <button
              type="button"
              onClick={onTriggerWave}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--accent-primary)]/25 px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-soft)] hover:bg-[var(--accent-primary)] hover:text-[var(--accent-contrast-text)]"
            >
              <Hand className="h-3 w-3" />
              Wave
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-[var(--border-subtle)] bg-[var(--bg-carbon)] px-3 py-2.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aura anything..."
              className="flex-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-recessed)] px-3.5 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:border-[var(--accent-glow)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send message to robot"
              className="btn-3d flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-primary)] text-[var(--accent-contrast-text)] hover:bg-[var(--accent-primary-hover)]"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-end gap-2.5">
          <div className="hidden max-w-[260px] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-3.5 py-2.5 text-xs leading-snug text-[var(--text-main)] shadow-xl backdrop-blur-md sm:block">
            <span className="mb-0.5 flex items-center gap-1 font-mono text-[10px] font-semibold text-[var(--accent-secondary-bright)] uppercase">
              <Sparkles className="h-2.5 w-2.5 text-[var(--accent-soft)]" />
              Aura says
            </span>
            <p className="line-clamp-2">{latestBotMsg}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="animate-pulse-ring btn-3d group flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--accent-primary)] text-[var(--accent-contrast-text)] shadow-xl"
            aria-label="Open robot chat assistant"
          >
            <MessageSquare className="h-6 w-6 transition-transform group-hover:scale-110" />
          </button>
        </div>
      )}
    </div>
  );
}
