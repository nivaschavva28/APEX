import React, { useState } from 'react';
import { ViewMode, ThemeId } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  hasUnreadNotification?: boolean;
  currentTheme?: ThemeId;
  onSelectTheme?: (theme: ThemeId) => void;
}

const THEME_OPTIONS: { id: ThemeId; name: string; color: string; bg: string }[] = [
  { id: 'indigo', name: 'Cyber Indigo', color: '#6366f1', bg: '#090d16' },
  { id: 'emerald', name: 'Emerald Matrix', color: '#10b981', bg: '#06110c' },
  { id: 'violet', name: 'Tokyo Dusk', color: '#a855f7', bg: '#0d0b18' },
  { id: 'amber', name: 'Solar Amber', color: '#f59e0b', bg: '#0c0a08' },
  { id: 'rose', name: 'Crimson Coral', color: '#f43f5e', bg: '#0f090d' },
];

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  currentTheme = 'indigo',
  onSelectTheme,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'APEX AI engine loaded (Gemini 3.7 Flash)', time: '2m ago', unread: true },
    { id: 2, text: 'Diagnostic complete for main.js - 1 potential issue identified', time: '10m ago', unread: true },
    { id: 3, text: 'IDE Extension binaries ready for download', time: '1h ago', unread: false },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const activeThemeObj = THEME_OPTIONS.find(t => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[var(--bg-main)]/90 backdrop-blur-xl z-[60] flex items-center justify-between px-6 shadow-[0_1px_12px_rgba(0,0,0,0.5)] border-b border-[var(--border-line)]">
      {/* Brand and Search */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onNavigate(currentView === 'landing' ? 'workspace' : 'landing')}
          className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
          title="Click to toggle Landing / Workspace"
        >
          {/* Logo icon */}
          <div className="w-7 h-7 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/40 flex items-center justify-center text-[var(--accent)] shadow-inner group-hover:scale-105 group-hover:border-[var(--accent)] transition-all">
            <span className="material-symbols-outlined text-[16px]">terminal</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wider font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors leading-none">
              APEX
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-sans-alt mt-0.5">
              Code Intelligence
            </span>
          </div>
        </button>

        {/* View Switcher Pill */}
        <div className="hidden sm:flex items-center bg-[var(--bg-surface)] p-0.5 rounded border border-[var(--border-line)] text-xs font-sans-alt">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              currentView === 'landing'
                ? 'bg-[var(--accent)] text-[#090d16] font-semibold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('workspace')}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              currentView === 'workspace'
                ? 'bg-[var(--accent)] text-[#090d16] font-semibold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            IDE Workspace
          </button>
        </div>

        {/* Global Search Bar */}
        <div
          onClick={onOpenSearch}
          className="hidden lg:flex items-center bg-[var(--bg-surface)] backdrop-blur-md rounded px-3 py-1.5 w-72 gap-2 border border-[var(--border-line)] hover:border-[var(--accent)]/50 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[var(--text-muted)] text-sm">search</span>
          <span className="text-[12px] text-[var(--text-muted)] font-mono flex-1 select-none">
            Search docs or code...
          </span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[var(--bg-surface-elevated)] text-[var(--accent)] rounded border border-[var(--accent)]/30 font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Color Palette Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-line)] hover:border-[var(--accent)]/50 transition-colors text-xs text-[var(--text-main)] cursor-pointer"
            title="Switch Color Palette"
          >
            <span
              className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: activeThemeObj.color }}
            />
            <span className="hidden md:inline text-[11px] font-sans-alt font-medium text-[var(--text-muted)]">
              {activeThemeObj.name}
            </span>
            <span className="material-symbols-outlined text-[14px] text-[var(--text-muted)]">
              palette
            </span>
          </button>

          {showThemePicker && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-surface)] backdrop-blur-xl border border-[var(--border-line)] rounded shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[10px] font-sans-alt uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-line)] mb-1.5">
                Select Color Palette
              </div>
              <div className="space-y-1">
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (onSelectTheme) onSelectTheme(t.id);
                      setShowThemePicker(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-xs transition-colors cursor-pointer text-left ${
                      currentTheme === t.id
                        ? 'bg-[var(--accent-badge-bg)] text-[var(--accent)] font-semibold border border-[var(--accent)]/30'
                        : 'hover:bg-white/[0.04] text-[var(--text-main)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: t.color }}
                      />
                      <span>{t.name}</span>
                    </div>
                    {currentTheme === t.id && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-2 rounded hover:bg-white/[0.04] relative cursor-pointer"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            {notifications.some(n => n.unread) && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-main)]"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-surface)] backdrop-blur-xl border border-[var(--border-line)] rounded shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-line)]">
                <span className="font-serif text-sm font-medium text-[var(--text-main)]">Diagnostics & Feeds</span>
                <button
                  onClick={markAllRead}
                  className="text-[11px] text-[var(--accent)] hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded text-xs flex items-start gap-2.5 ${
                      n.unread ? 'bg-[var(--accent-badge-bg)] border border-[var(--accent)]/20' : 'bg-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[var(--accent)] text-[15px] mt-0.5">
                      info
                    </span>
                    <div className="flex-1">
                      <p className="text-[var(--text-main)] leading-snug">{n.text}</p>
                      <span className="text-[10px] text-[var(--text-muted)]">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-[var(--border-line)]">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-medium text-[var(--text-main)]">Dev Architect</div>
            <div className="text-[9px] text-[var(--accent)] uppercase tracking-[0.2em] font-sans-alt">
              Pro Tier
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-[var(--accent)]/40 p-[1px] shadow-sm">
            <div className="w-full h-full rounded-full bg-[var(--bg-surface-elevated)] flex items-center justify-center text-xs font-serif font-semibold text-[var(--accent)]">
              DA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
