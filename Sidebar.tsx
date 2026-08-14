import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  tokensUsed: number;
  totalTokens: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  tokensUsed,
  totalTokens,
}) => {
  const percentage = Math.min(100, Math.round((tokensUsed / totalTokens) * 100));

  const navItems: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'workspace', label: 'Workspace', icon: 'terminal' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'documentation', label: 'Documentation', icon: 'menu_book' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-[var(--bg-surface)] z-50 flex flex-col border-r border-[var(--border-line)] select-none">
      {/* Gallery / Archive Nav Header */}
      <div className="px-6 pt-5 pb-2">
        <span className="text-[9px] uppercase font-sans-alt tracking-[0.3em] text-[var(--text-muted)]">
          Navigation
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center w-full px-4 py-2.5 rounded transition-all text-left text-xs font-sans-alt cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent-badge-bg)] text-[var(--accent)] border border-[var(--accent)]/30 shadow-sm font-semibold'
                  : 'text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-[var(--text-main)]'
              }`}
            >
              <span
                className={`material-symbols-outlined mr-3 text-[18px] transition-colors ${
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {item.icon}
              </span>
              <span className={isActive ? 'font-medium tracking-wide' : 'tracking-normal'}>
                {item.label}
              </span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Capacity Token Widget */}
      <div className="p-4 mt-auto">
        <div className="bg-[var(--bg-surface-card)] backdrop-blur-md rounded p-4 border border-[var(--border-line)] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--text-muted)] text-[9px] tracking-[0.25em] uppercase font-sans-alt font-semibold">
              COMPUTE QUOTA
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] font-mono">
              {percentage}%
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-[var(--bg-main)] rounded-full h-1 mb-2.5 overflow-hidden border border-white/[0.05]">
            <div
              className="h-1 rounded-full transition-all duration-500 ease-out bg-[var(--accent)]"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-sans-alt">
            <span className="font-mono text-[10px]">{tokensUsed} / {totalTokens} tkn</span>
            <button
              onClick={() => onNavigate('settings')}
              className="text-[var(--accent)] hover:underline text-[10px] tracking-wide cursor-pointer"
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
