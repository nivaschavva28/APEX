import React from 'react';
import { ViewMode } from '../types';

interface DocumentationViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)] p-6 bg-[var(--bg-main)] overflow-y-auto text-[var(--text-main)] font-sans-alt">
      <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
        {/* Title */}
        <div className="border-b border-[var(--border-line)] pb-5">
          <span className="text-[9px] uppercase font-sans-alt tracking-[0.3em] text-[var(--accent)] font-semibold">
            Manual & Treatise
          </span>
          <h1 className="font-serif text-3xl font-normal text-[var(--text-main)] flex items-center gap-2 mt-0.5">
            <span className="material-symbols-outlined text-[var(--accent)] text-[26px]">menu_book</span>
            Documentation & System Architecture
          </h1>
          <p className="font-sans-alt text-xs text-[var(--text-muted)] mt-1 font-light">
            Understand how to leverage AI-assisted diagnostics, interpret architectural anomalies, and configure IDE extensions.
          </p>
        </div>

        {/* Quick Start Guide */}
        <section className="bg-[var(--bg-surface)] border border-[var(--border-line)] rounded p-6 space-y-4 shadow-sm">
          <h2 className="font-serif text-lg font-medium text-[var(--text-main)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent)] text-[20px]">bolt</span>
            Quick Start: Analyzing Your First Source Snippet
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
            APEX evaluates your source buffer directly to uncover algorithmic pitfalls, boundary violations, race hazards, and structural typing mismatches.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[var(--bg-surface-card)] p-4 rounded border border-[var(--border-line)]">
              <span className="font-mono text-xs text-[var(--accent)] font-medium block mb-1">01. Ingest Code</span>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                Paste your snippet or select one of the curated scenario templates from the Studio dropdown.
              </p>
            </div>
            <div className="bg-[var(--bg-surface-card)] p-4 rounded border border-[var(--border-line)]">
              <span className="font-mono text-xs text-[var(--accent)] font-medium block mb-1">02. Invoke Audit</span>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                The AI engine inspects the control flow and highlights exact line numbers with anomalies.
              </p>
            </div>
            <div className="bg-[var(--bg-surface-card)] p-4 rounded border border-[var(--border-line)]">
              <span className="font-mono text-xs text-[var(--accent)] font-medium block mb-1">03. Comprehend & Fix</span>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                Read the "Why" and "What Happened" insights, or click "Apply Fix" to implement verified refactors.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Capabilities */}
        <section className="space-y-4">
          <div className="text-[10px] uppercase font-sans-alt tracking-[0.25em] text-[var(--accent)] font-semibold">
            Core Philosophies
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--bg-surface)] p-5 rounded border border-[var(--border-line)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-serif font-medium">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                Deep "Why" Reasoning
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
                Rather than providing dry error strings, APEX conveys language-level fundamentals (zero-indexing, hoisting, closures, memory allocation).
              </p>
            </div>

            <div className="bg-[var(--bg-surface)] p-5 rounded border border-[var(--border-line)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-serif font-medium">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                Safe In-Studio Sandbox
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
                Execute code safely via the "Execute" button to inspect live standard output, returns, and caught exceptions in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="bg-[var(--bg-surface)] border border-[var(--border-line)] rounded p-6 space-y-4 shadow-sm">
          <h2 className="font-serif text-lg font-medium text-[var(--text-main)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent)] text-[20px]">keyboard</span>
            Studio Keybindings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-[var(--bg-surface-card)] rounded border border-[var(--border-line)]">
              <span className="text-[var(--text-muted)] font-light">Open Command Search</span>
              <kbd className="px-2 py-0.5 bg-[var(--bg-main)] rounded text-[var(--accent)] font-mono text-[11px] border border-[var(--border-line)]">⌘ + K</kbd>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[var(--bg-surface-card)] rounded border border-[var(--border-line)]">
              <span className="text-[var(--text-muted)] font-light">Execute Code</span>
              <kbd className="px-2 py-0.5 bg-[var(--bg-main)] rounded text-[var(--accent)] font-mono text-[11px] border border-[var(--border-line)]">⌘ + Enter</kbd>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[var(--bg-surface-card)] rounded border border-[var(--border-line)]">
              <span className="text-[var(--text-muted)] font-light">Trigger AI Analysis</span>
              <kbd className="px-2 py-0.5 bg-[var(--bg-main)] rounded text-[var(--accent)] font-mono text-[11px] border border-[var(--border-line)]">⌘ + Shift + A</kbd>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[var(--bg-surface-card)] rounded border border-[var(--border-line)]">
              <span className="text-[var(--text-muted)] font-light">Toggle Overview / Studio</span>
              <kbd className="px-2 py-0.5 bg-[var(--bg-main)] rounded text-[var(--accent)] font-mono text-[11px] border border-[var(--border-line)]">Esc</kbd>
            </div>
          </div>
        </section>

        {/* Action CTA */}
        <div className="flex justify-end">
          <button
            onClick={() => onNavigate('workspace')}
            className="px-5 py-2.5 bg-[var(--accent)] text-[#090d16] font-sans-alt font-semibold text-xs tracking-wider uppercase rounded hover:opacity-90 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            Launch Code Studio
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
