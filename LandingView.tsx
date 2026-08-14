import React from 'react';
import { ViewMode } from '../types';

interface LandingViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenDemo,
}) => {
  return (
    <div className="flex flex-col w-full text-[var(--text-main)] bg-[var(--bg-main)] min-h-screen selection:bg-[var(--accent)]/30 selection:text-[var(--accent)]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex flex-col items-center pt-28 pb-20 px-4 lg:px-6 bg-[var(--bg-main)]">
        {/* Glow ambient background with theme accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
          <div className="w-[800px] h-[800px] bg-[var(--accent)]/10 rounded-full blur-[160px] -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 font-sans-alt text-[10px] text-[var(--accent)] tracking-[0.25em] uppercase mb-2 shadow-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mr-2.5 animate-pulse"></span>
            AI Code Diagnostics & Intelligence Engine • Gemini 3.7 Flash
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[72px] lg:leading-[80px] text-[var(--text-main)] max-w-4xl tracking-tight font-normal">
            An AI companion for{' '}
            <span className="italic font-light text-[var(--accent)]">
              better code.
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-sans-alt text-[var(--text-muted)] max-w-2xl text-sm sm:text-base leading-relaxed font-light">
            Understand architectural errors, uncover deep algorithmic anomalies, review semantics, and elevate craft without breaking your development flow.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('workspace')}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[var(--accent)] text-[#090d16] font-sans-alt font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-all shadow-lg shadow-[var(--accent)]/20 flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
            >
              Start Coding Free
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-line)] font-sans-alt font-medium text-xs tracking-wider uppercase hover:border-[var(--accent)]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Examine Demo
              <span className="material-symbols-outlined text-[16px] text-[var(--accent)]">play_circle</span>
            </button>
          </div>

          {/* Interactive Window Mockup */}
          <div className="w-full mt-16 relative group">
            <div className="absolute -inset-1 bg-[var(--accent)]/20 rounded blur-xl opacity-40 group-hover:opacity-75 transition duration-1000"></div>
            
            <div className="relative bg-[var(--bg-surface)] rounded border border-[var(--border-line)] shadow-2xl overflow-hidden transform transition-transform duration-700">
              {/* Window Header */}
              <div className="flex items-center px-4 py-3 bg-[var(--bg-surface-card)] border-b border-[var(--border-line)]">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--error-border)]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--success-border)]/80"></div>
                </div>
                <div className="mx-auto flex items-center bg-[var(--bg-main)] px-3.5 py-1 rounded text-xs font-mono text-[var(--text-muted)] font-medium border border-[var(--border-line)]">
                  <span className="material-symbols-outlined text-[13px] mr-2 text-[var(--accent)]">lock</span>
                  workspace.apex.dev
                </div>
                <button
                  onClick={() => onNavigate('workspace')}
                  className="text-xs text-[var(--accent)] hover:underline font-mono hidden sm:inline cursor-pointer"
                >
                  Open in Studio →
                </button>
              </div>

              {/* Window Content / Interactive Preview */}
              <div
                onClick={() => onNavigate('workspace')}
                className="cursor-pointer relative overflow-hidden bg-[var(--bg-main)] group/preview"
              >
                <img
                  className="w-full h-auto object-cover border-b border-[var(--border-line)] block transition-transform duration-500 group-hover/preview:scale-[1.005]"
                  alt="High-fidelity UI mockup of code editor on the left and AI assistant chat interface on the right"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDRfKRIiongR0ShwoQIbUsue3EIFoWHpkpclnGWpoR29PgUFHC6-ilqlWjisxMtGNzr0Wl6liwI0zHa_ju14IHPnVR_Fyiv4C8Y4lofQunJSvZr7W1WxeO57aUGpUHrQxAQ5G2lvr8Lq3dpc9ZznjNtLgBy6yTy-mVQ0WpsN2HU5w0VM9J_-wbadyt7_JBTPu46tsu2AqasBYexwe8KkZmE0x0HunovALksNspWHTjABh99owQq0Ls"
                />
                <div className="absolute inset-0 bg-[var(--bg-main)]/30 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="px-5 py-2.5 rounded bg-[var(--bg-surface)] border border-[var(--accent)]/50 text-[var(--text-main)] text-xs font-sans-alt tracking-wider uppercase font-medium shadow-2xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[var(--accent)] text-[16px]">open_in_new</span>
                    Launch Live Workspace
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Section */}
      <section className="w-full bg-[var(--bg-surface)] py-28 px-4 lg:px-6 relative border-t border-[var(--border-line)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] uppercase font-sans-alt tracking-[0.3em] text-[var(--accent)] font-semibold">
              Core Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-main)] font-normal">
              Designed for Deep Comprehension
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Understand Why */}
            <div className="flex flex-col p-8 bg-[var(--bg-surface-card)] rounded hover:border-[var(--accent)]/50 transition-all border border-[var(--border-line)] shadow-sm relative overflow-hidden group">
              <div className="w-11 h-11 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-main)] mb-3">Understand Why</h3>
              <p className="font-sans-alt text-xs leading-relaxed text-[var(--text-muted)] flex-grow">
                Don't just copy-paste solutions. APEX breaks down complex logic and explains the architectural 'why' behind the 'how', turning every bug into a craft opportunity.
              </p>
            </div>

            {/* Feature 2: Bring Your Own Code */}
            <div className="flex flex-col p-8 bg-[var(--bg-surface-card)] rounded hover:border-[var(--accent)]/50 transition-all border border-[var(--border-line)] shadow-sm relative overflow-hidden group">
              <div className="w-11 h-11 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">code_blocks</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-main)] mb-3">Bring Your Own Code</h3>
              <p className="font-sans-alt text-xs leading-relaxed text-[var(--text-muted)] flex-grow">
                Seamlessly integrate with your existing codebase. Connect repositories or paste raw snippets directly; answers are contextualized against your specific environment.
              </p>
            </div>

            {/* Feature 3: Action-Oriented Assistance */}
            <div className="flex flex-col p-8 bg-[var(--bg-surface-card)] rounded hover:border-[var(--accent)]/50 transition-all border border-[var(--border-line)] shadow-sm relative overflow-hidden group">
              <div className="w-11 h-11 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-main)] mb-3">Action-Oriented Assistance</h3>
              <p className="font-sans-alt text-xs leading-relaxed text-[var(--text-muted)] flex-grow">
                Receive actionable recommendations, auto-generate type definitions, and apply surgical bugfixes with a single click. Move from hypothesis to execution swiftly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Everywhere You Code - Extension Teaser */}
      <section className="w-full bg-[var(--bg-main)] py-28 px-4 lg:px-6 border-t border-[var(--border-line)]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left Text */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] font-sans-alt text-[9px] tracking-[0.25em] uppercase font-semibold">
              Coming Soon
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[var(--text-main)] font-normal leading-tight">
              Everywhere you write code.
            </h2>
            <p className="font-sans-alt text-[var(--text-muted)] max-w-xl text-sm leading-relaxed font-light">
              We are curating native extensions for VS Code, IntelliJ, and Neovim. Soon, APEX will live directly inside your editor, providing inline context without disrupting your workflow.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenWaitlist}
                className="inline-flex items-center gap-2 text-[var(--accent)] font-sans-alt text-xs tracking-wider uppercase font-medium hover:underline cursor-pointer"
              >
                Join the Extension Waitlist
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Floating IDE Icons Grid */}
          <div className="flex-1 w-full relative">
            <div className="grid grid-cols-2 gap-4 relative z-0">
              <div className="bg-[var(--bg-surface)] h-28 rounded border border-[var(--border-line)] flex flex-col items-center justify-center p-4 hover:border-[var(--accent)]/50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-3xl text-[var(--accent)] mb-1.5">terminal</span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">VS Code</span>
              </div>
              <div className="bg-[var(--bg-surface)] h-28 rounded border border-[var(--border-line)] flex flex-col items-center justify-center p-4 translate-y-6 hover:border-[var(--accent)]/50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-3xl text-[var(--accent)] mb-1.5">integration_instructions</span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">IntelliJ IDEA</span>
              </div>
              <div className="bg-[var(--bg-surface)] h-28 rounded border border-[var(--border-line)] flex flex-col items-center justify-center p-4 -translate-y-3 hover:border-[var(--accent)]/50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-3xl text-[var(--accent)] mb-1.5">data_object</span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">Neovim / Lua</span>
              </div>
              <div className="bg-[var(--bg-surface)] h-28 rounded border border-[var(--border-line)] flex flex-col items-center justify-center p-4 translate-y-3 hover:border-[var(--accent)]/50 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-3xl text-[var(--accent)] mb-1.5">api</span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">CLI & Automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[var(--bg-surface)] py-8 px-6 border-t border-[var(--border-line)] text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[var(--accent)]">terminal</span>
            <span className="font-serif font-medium text-[var(--text-main)]">APEX</span>
            <span>— Curated development companion</span>
          </div>
          <div className="flex items-center gap-5 font-sans-alt text-xs">
            <button onClick={() => onNavigate('documentation')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
              Documentation
            </button>
            <button onClick={() => onNavigate('settings')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
              Settings
            </button>
            <button onClick={() => onNavigate('workspace')} className="text-[var(--accent)] hover:underline font-medium cursor-pointer">
              Launch Studio
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
