import React, { useState } from 'react';
import { ViewMode } from '../types';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: '1. Intelligent Gutter Diagnostics',
      desc: 'APEX audits your active buffer in real time, identifying out-of-bounds loops, async race conditions, and typing mismatches.',
      badge: 'Static & Runtime Analysis',
      icon: 'radar',
    },
    {
      title: '2. Deep "Why" Explanations',
      desc: 'Understand the underlying computer science mechanism behind each bug, turning every anomaly into craft mastery.',
      badge: 'Concept Breakdown',
      icon: 'psychology',
    },
    {
      title: '3. One-Click Quick Fixes & Optimization',
      desc: 'Apply tested, idiomatic fixes with a single button click directly in your code buffer or execute in the safe sandbox.',
      badge: 'Action-Oriented',
      icon: 'auto_fix_high',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-150 font-sans-alt">
      <div
        className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] rounded shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-150 text-[var(--text-main)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--bg-surface-card)] border-b border-[var(--border-line)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent)] text-[20px]">play_circle</span>
            <span className="font-serif text-base font-medium text-[var(--text-main)]">
              APEX Walkthrough
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded hover:bg-white/[0.04] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video / Interactive Visual Mockup */}
        <div className="p-6 space-y-6">
          <div className="relative rounded overflow-hidden border border-[var(--border-line)] bg-[var(--bg-main)] aspect-video flex flex-col justify-center items-center text-center p-6 shadow-inner">
            <div className="w-14 h-14 rounded-full bg-[var(--bg-surface-card)] border border-[var(--accent)]/40 text-[var(--accent)] flex items-center justify-center mb-4 shadow-lg shadow-[var(--accent)]/10 animate-bounce">
              <span className="material-symbols-outlined text-2xl">
                {tourSteps[step].icon}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/30 text-[var(--accent)] text-[9px] font-sans-alt uppercase tracking-[0.2em] mb-2 font-semibold">
              {tourSteps[step].badge}
            </span>
            <h3 className="font-serif text-xl font-normal text-[var(--text-main)] mb-2">
              {tourSteps[step].title}
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md leading-relaxed font-light">
              {tourSteps[step].desc}
            </p>
          </div>

          {/* Stepper Dots & Navigation */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              {tourSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    step === i ? 'w-6 bg-[var(--accent)]' : 'w-2 bg-white/[0.15]'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {step < tourSteps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 rounded bg-[var(--bg-surface-card)] hover:bg-white/[0.08] border border-[var(--border-line)] text-xs text-[var(--text-main)] font-sans-alt tracking-wider uppercase font-medium transition-colors cursor-pointer"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('workspace');
                  }}
                  className="px-5 py-2 rounded bg-[var(--accent)] text-[#090d16] font-sans-alt tracking-wider uppercase font-semibold text-xs hover:opacity-90 transition-colors shadow-md cursor-pointer"
                >
                  Try in Studio
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
