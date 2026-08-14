import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { SAMPLE_SNIPPETS } from '../data/snippets';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
  onLoadSnippet: (code: string, fileName: string, language: string) => void;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onLoadSnippet,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredSnippets = SAMPLE_SNIPPETS.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.fileName.toLowerCase().includes(query.toLowerCase()) ||
      s.language.toLowerCase().includes(query.toLowerCase())
  );

  const navigationCommands = [
    { label: 'Go to Code Studio', view: 'workspace' as ViewMode, icon: 'terminal' },
    { label: 'Go to Overview / Landing Page', view: 'landing' as ViewMode, icon: 'home' },
    { label: 'View Diagnostic Archive', view: 'history' as ViewMode, icon: 'history_edu' },
    { label: 'Read Documentation & Treatises', view: 'documentation' as ViewMode, icon: 'menu_book' },
    { label: 'Open Settings & Preferences', view: 'settings' as ViewMode, icon: 'settings' },
  ].filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-150 font-sans-alt">
      <div
        className="w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-line)] rounded shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-line)] bg-[var(--bg-surface-card)]">
          <span className="material-symbols-outlined text-[var(--accent)] text-[20px] mr-3">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, archive snippets, or languages..."
            className="w-full bg-transparent border-none text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-0 font-sans-alt"
          />
          <kbd
            onClick={onClose}
            className="px-2 py-0.5 text-[10px] bg-[var(--bg-main)] text-[var(--text-muted)] rounded border border-[var(--border-line)] cursor-pointer hover:text-[var(--text-main)] font-mono"
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {/* Navigation Commands */}
          <div className="px-3 py-1.5 text-[9px] uppercase font-sans-alt tracking-[0.25em] text-[var(--accent)] font-semibold">
            Directives
          </div>
          {navigationCommands.map((cmd) => (
            <button
              key={cmd.view}
              onClick={() => {
                onNavigate(cmd.view);
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-white/[0.04] text-xs text-[var(--text-main)] group transition-colors text-left cursor-pointer font-sans-alt"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[var(--text-muted)] group-hover:text-[var(--accent)] text-[18px]">
                  {cmd.icon}
                </span>
                <span>{cmd.label}</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">Navigate</span>
            </button>
          ))}

          {/* Sample Snippets */}
          <div className="px-3 pt-3 pb-1 text-[9px] uppercase font-sans-alt tracking-[0.25em] text-[var(--accent)] font-semibold">
            Archived Scenarios & Anomalies
          </div>
          {filteredSnippets.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                onLoadSnippet(s.code, s.fileName, s.language);
                onNavigate('workspace');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-white/[0.04] text-xs text-[var(--text-main)] group transition-colors text-left cursor-pointer font-sans-alt"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[var(--accent)] text-[18px]">
                  code
                </span>
                <div>
                  <div className="font-medium text-[var(--text-main)]">{s.name}</div>
                  <div className="text-[10px] text-[var(--text-muted)] font-mono">{s.fileName}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[var(--bg-main)] text-[10px] text-[var(--text-muted)] font-mono border border-[var(--border-line)]">
                {s.language}
              </span>
            </button>
          ))}
        </div>

        <div className="px-4 py-2 bg-[var(--bg-main)] border-t border-[var(--border-line)] text-[10px] text-[var(--text-muted)] flex justify-between font-sans-alt">
          <span>⌘K to invoke search anytime</span>
          <span className="text-[var(--accent)] font-semibold">APEX 2.0</span>
        </div>
      </div>
    </div>
  );
};
