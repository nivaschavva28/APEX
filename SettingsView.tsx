import React, { useState } from 'react';
import { AppSettings, ViewMode, ThemeId } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  tokensUsed: number;
  totalTokens: number;
  onResetTokens: () => void;
  onNavigate: (view: ViewMode) => void;
}

const PALETTES: { id: ThemeId; name: string; desc: string; accent: string; bg: string; text: string }[] = [
  {
    id: 'indigo',
    name: 'Cyber Indigo & Cyan',
    desc: 'Deep slate midnight with electric indigo & high-contrast cyan accents.',
    accent: '#6366f1',
    bg: '#090d16',
    text: '#f8fafc',
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    desc: 'Dark terminal obsidian with vivid emerald, jade and mint cues.',
    accent: '#10b981',
    bg: '#06110c',
    text: '#f0fdf4',
  },
  {
    id: 'violet',
    name: 'Tokyo Dusk',
    desc: 'Nocturnal purple-violet canvas with vibrant magenta and lavender lights.',
    accent: '#a855f7',
    bg: '#0d0b18',
    text: '#faf5ff',
  },
  {
    id: 'amber',
    name: 'Solar Amber & Gold',
    desc: 'Warm museum archive obsidian with rich amber brass highlights.',
    accent: '#f59e0b',
    bg: '#0c0a08',
    text: '#fffbeb',
  },
  {
    id: 'rose',
    name: 'Crimson Coral',
    desc: 'High-contrast ruby and coral accents on a midnight ruby canvas.',
    accent: '#f43f5e',
    bg: '#0f090d',
    text: '#fff1f2',
  },
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  tokensUsed,
  totalTokens,
  onResetTokens,
  onNavigate,
}) => {
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)] p-6 bg-[var(--bg-main)] overflow-y-auto text-[var(--text-main)] font-sans-alt">
      <div className="max-w-3xl mx-auto w-full space-y-6 pb-12">
        {/* Header */}
        <div className="border-b border-[var(--border-line)] pb-5 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase font-sans-alt tracking-[0.3em] text-[var(--accent)] font-semibold">
              Configuration
            </span>
            <h1 className="font-serif text-3xl font-normal text-[var(--text-main)] flex items-center gap-2 mt-0.5">
              <span className="material-symbols-outlined text-[var(--accent)] text-[26px]">settings</span>
              Settings & Intelligence Parameters
            </h1>
            <p className="font-sans-alt text-xs text-[var(--text-muted)] mt-1 font-light">
              Configure your active color palette, AI intelligence model, editor behavior, and quota.
            </p>
          </div>
          {savedToast && (
            <span className="px-3 py-1 rounded bg-[var(--success-bg)] border border-[var(--success-border)]/40 text-[var(--success-text)] text-xs font-sans-alt animate-in fade-in">
              Parameters Persisted
            </span>
          )}
        </div>

        {/* Color Palette Selection */}
        <section className="bg-[var(--bg-surface)] border border-[var(--border-line)] rounded p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium text-[var(--text-main)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--accent)] text-[18px]">palette</span>
              Color Palette & Visual Theme
            </h2>
            <span className="text-[10px] text-[var(--accent)] font-sans-alt uppercase tracking-widest font-semibold">
              Live Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {PALETTES.map((p) => {
              const isSelected = settings.theme === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    onUpdateSettings({ theme: p.id });
                    handleSave();
                  }}
                  className={`p-3.5 rounded border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-[var(--accent-badge-bg)] border-[var(--accent)] shadow-md ring-1 ring-[var(--accent)]/30'
                      : 'bg-[var(--bg-surface-card)] border-[var(--border-line)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: p.accent }}
                      />
                      <span className="text-xs font-semibold text-[var(--text-main)]">{p.name}</span>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] text-[var(--accent)]">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                    {p.desc}
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    <span className="w-5 h-2 rounded-full border border-white/10" style={{ backgroundColor: p.bg }}></span>
                    <span className="w-5 h-2 rounded-full" style={{ backgroundColor: p.accent }}></span>
                    <span className="w-5 h-2 rounded-full border border-white/10" style={{ backgroundColor: p.text }}></span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* AI Model Settings */}
        <section className="bg-[var(--bg-surface)] border border-[var(--border-line)] rounded p-6 space-y-4 shadow-sm">
          <h2 className="font-serif text-lg font-medium text-[var(--text-main)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent)] text-[18px]">smart_toy</span>
            AI Intelligence Model
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-1.5 font-medium">Active Intelligence Model</label>
              <select
                value={settings.model}
                onChange={(e) => {
                  onUpdateSettings({ model: e.target.value });
                  handleSave();
                }}
                className="w-full bg-[var(--bg-surface-card)] border border-[var(--border-line)] rounded p-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] font-sans-alt cursor-pointer"
              >
                <option value="gemini-3.7-flash" className="bg-[var(--bg-surface)]">Gemini 3.7 Flash (Ultra Low Latency & High Code Reasoning)</option>
                <option value="gemini-3.1-pro-preview" className="bg-[var(--bg-surface)]">Gemini 3.1 Pro (Deep Logical STEM Analysis)</option>
                <option value="local" className="bg-[var(--bg-surface)]">Local Heuristics Engine (Offline / Safe Fallback)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-medium">Model Temperature: {settings.temperature}</label>
                <span className="text-[10px] text-[var(--accent)] font-mono">Lower = Deterministic Audit</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => {
                  onUpdateSettings({ temperature: parseFloat(e.target.value) });
                  handleSave();
                }}
                className="w-full accent-[var(--accent)] bg-[var(--bg-surface-card)] h-1 rounded cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Token Management */}
        <section className="bg-[var(--bg-surface)] border border-[var(--border-line)] rounded p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium text-[var(--text-main)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--accent)] text-[18px]">data_usage</span>
              Compute Quota & Token Allocation
            </h2>
            <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] font-sans-alt uppercase tracking-widest font-semibold">
              Pro Tier
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
              <span>{tokensUsed} of {totalTokens} tokens consumed this cycle</span>
              <span className="font-mono text-[var(--accent)]">{Math.round((tokensUsed / totalTokens) * 100)}%</span>
            </div>
            <div className="w-full bg-[var(--bg-main)] rounded-full h-1.5 overflow-hidden border border-white/[0.06]">
              <div
                className="bg-[var(--accent)] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (tokensUsed / totalTokens) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                onResetTokens();
                handleSave();
              }}
              className="px-3.5 py-1.5 rounded bg-[var(--bg-surface-card)] hover:bg-[var(--accent)] hover:text-[#090d16] text-xs text-[var(--text-main)] border border-[var(--border-line)] transition-colors flex items-center gap-1.5 cursor-pointer font-sans-alt uppercase tracking-wider text-[11px]"
            >
              <span className="material-symbols-outlined text-[15px]">refresh</span>
              Replenish Token Allocation
            </button>
          </div>
        </section>

        {/* Editor Preferences */}
        <section className="bg-[var(--bg-surface)] border border-[var(--border-line)] rounded p-6 space-y-4 shadow-sm">
          <h2 className="font-serif text-lg font-medium text-[var(--text-main)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent)] text-[18px]">code</span>
            Code Editor Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-1.5 font-medium">Editor Font Size</label>
              <select
                value={settings.fontSize}
                onChange={(e) => {
                  onUpdateSettings({ fontSize: parseInt(e.target.value, 10) });
                  handleSave();
                }}
                className="w-full bg-[var(--bg-surface-card)] border border-[var(--border-line)] rounded p-2 text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] font-sans-alt cursor-pointer"
              >
                <option value={12} className="bg-[var(--bg-surface)]">12px - Dense</option>
                <option value={13} className="bg-[var(--bg-surface)]">13px - Standard Default</option>
                <option value={14} className="bg-[var(--bg-surface)]">14px - Comfortable</option>
                <option value={16} className="bg-[var(--bg-surface)]">16px - Large</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-1.5 font-medium">Tab Indentation</label>
              <select
                value={settings.tabSize}
                onChange={(e) => {
                  onUpdateSettings({ tabSize: parseInt(e.target.value, 10) });
                  handleSave();
                }}
                className="w-full bg-[var(--bg-surface-card)] border border-[var(--border-line)] rounded p-2 text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] font-sans-alt cursor-pointer"
              >
                <option value={2} className="bg-[var(--bg-surface)]">2 Spaces</option>
                <option value={4} className="bg-[var(--bg-surface)]">4 Spaces</option>
              </select>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => onNavigate('workspace')}
            className="px-5 py-2 rounded bg-[var(--accent)] text-[#090d16] font-sans-alt font-medium text-xs tracking-wider uppercase hover:opacity-90 transition-colors cursor-pointer shadow-sm"
          >
            Return to Studio
          </button>
        </div>
      </div>
    </div>
  );
};
