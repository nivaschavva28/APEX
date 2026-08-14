import React, { useState } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [ide, setIde] = useState('vscode');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-150 font-sans-alt">
      <div
        className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-line)] rounded shadow-2xl p-6 relative animate-in zoom-in-95 duration-150 text-[var(--text-main)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded hover:bg-white/[0.04] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)]/40 text-[var(--success-text)] flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-[24px]">check</span>
            </div>
            <h3 className="font-serif text-xl font-normal text-[var(--text-main)]">Inscribed in Access Register</h3>
            <p className="text-xs text-[var(--text-muted)] font-sans-alt font-light leading-relaxed">
              We shall deliver your early access credential and IDE plugin binaries to <span className="text-[var(--accent)] font-mono">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] font-sans-alt text-[9px] uppercase tracking-widest font-semibold">
                Early Access
              </div>
              <h2 className="font-serif text-2xl font-normal text-[var(--text-main)]">
                Join the Extension Waitlist
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-sans-alt font-light leading-relaxed">
                Experience APEX inline diagnostics natively inside your chosen development environment.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-1 font-medium">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@domain.com"
                  className="w-full bg-[var(--bg-surface-card)] border border-[var(--border-line)] rounded px-3.5 py-2.5 text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] font-sans-alt"
                />
              </div>

              <div>
                <label className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider block mb-1 font-medium">Primary IDE</label>
                <select
                  value={ide}
                  onChange={(e) => setIde(e.target.value)}
                  className="w-full bg-[var(--bg-surface-card)] border border-[var(--border-line)] rounded px-3 py-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] font-sans-alt cursor-pointer"
                >
                  <option value="vscode" className="bg-[var(--bg-surface)]">Visual Studio Code</option>
                  <option value="intellij" className="bg-[var(--bg-surface)]">IntelliJ IDEA / WebStorm</option>
                  <option value="neovim" className="bg-[var(--bg-surface)]">Neovim (Lua plugin)</option>
                  <option value="cursor" className="bg-[var(--bg-surface)]">Cursor / Zed</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 font-sans-alt">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-[var(--bg-surface-card)] border border-[var(--border-line)] hover:bg-white/[0.06] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-[var(--accent)] text-[#090d16] font-sans-alt font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-colors shadow-md cursor-pointer"
              >
                Request Access
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
