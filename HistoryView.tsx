import React, { useState } from 'react';
import { HistoryItem, ViewMode } from '../types';

interface HistoryViewProps {
  historyItems: HistoryItem[];
  onLoadSnippet: (code: string, fileName: string, language: string) => void;
  onNavigate: (view: ViewMode) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyItems,
  onLoadSnippet,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResolved, setFilterResolved] = useState<'all' | 'resolved' | 'issues'>('all');

  const filtered = historyItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.issueSummary.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterResolved === 'resolved') return matchesSearch && item.resolved;
    if (filterResolved === 'issues') return matchesSearch && !item.resolved;
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)] p-6 bg-[var(--bg-main)] overflow-y-auto text-[var(--text-main)] font-sans-alt">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-line)]">
          <div>
            <span className="text-[9px] uppercase font-sans-alt tracking-[0.3em] text-[var(--accent)] font-semibold">
              Archival Records
            </span>
            <h1 className="font-serif text-3xl font-normal text-[var(--text-main)] flex items-center gap-2 mt-0.5">
              <span className="material-symbols-outlined text-[var(--accent)] text-[26px]">history_edu</span>
              Diagnostic Archive
            </h1>
            <p className="font-sans-alt text-xs text-[var(--text-muted)] mt-1 font-light">
              Review historical AI code reviews, automated anomalies, and compute allocations across sessions.
            </p>
          </div>

          <button
            onClick={() => onNavigate('workspace')}
            className="px-4 py-2 bg-[var(--accent)] text-[#090d16] font-sans-alt font-semibold text-xs tracking-wider uppercase rounded hover:opacity-90 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Diagnostic
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search archive by filename or anomaly..."
              className="w-full bg-[var(--bg-surface)] border border-[var(--border-line)] rounded pl-9 pr-4 py-2 text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] font-sans-alt"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto font-sans-alt">
            <button
              onClick={() => setFilterResolved('all')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                filterResolved === 'all'
                  ? 'bg-[var(--accent-badge-bg)] text-[var(--accent)] border border-[var(--accent)]/40 font-semibold'
                  : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              All ({historyItems.length})
            </button>
            <button
              onClick={() => setFilterResolved('issues')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                filterResolved === 'issues'
                  ? 'bg-[var(--error-bg)] text-[var(--error-text)] border border-[var(--error-border)]/50 font-semibold'
                  : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Anomalies
            </button>
            <button
              onClick={() => setFilterResolved('resolved')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                filterResolved === 'resolved'
                  ? 'bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]/50 font-semibold'
                  : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Verified
            </button>
          </div>
        </div>

        {/* History Cards List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-[var(--bg-surface)] rounded border border-[var(--border-line)] p-8">
            <span className="material-symbols-outlined text-4xl text-[var(--accent)]/40 mb-3">folder_open</span>
            <h3 className="font-serif text-base font-medium text-[var(--text-main)]">No archives matched</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-sans-alt">Execute an analysis in Studio to record telemetry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-card)] border border-[var(--border-line)] hover:border-[var(--accent)]/40 rounded p-4 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-sm"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.resolved ? 'bg-[var(--success-border)]' : 'bg-[var(--error-border)]'
                      }`}
                    ></span>
                    <span className="font-mono text-xs font-medium text-[var(--text-main)] truncate">
                      {item.fileName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-line)] text-[var(--text-muted)] font-mono">
                      {item.language}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">• {item.timestamp}</span>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] font-sans-alt line-clamp-1 font-light">{item.issueSummary}</p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    {item.tokensUsed} tkn
                  </span>
                  <button
                    onClick={() => {
                      onLoadSnippet(item.code, item.fileName, item.language);
                      onNavigate('workspace');
                    }}
                    className="px-3 py-1.5 rounded bg-[var(--bg-surface-card)] hover:bg-[var(--accent)] text-[var(--text-main)] hover:text-[#090d16] text-xs font-sans-alt tracking-wider uppercase font-medium transition-colors flex items-center gap-1 cursor-pointer border border-[var(--border-line)] hover:border-transparent"
                  >
                    <span>Load Studio</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
