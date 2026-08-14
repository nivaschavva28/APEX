import React, { useState, useRef, useEffect } from 'react';
import { AnalysisResult, ChatMessage, CodeSnippet, HistoryItem } from '../types';
import { SAMPLE_SNIPPETS } from '../data/snippets';

interface WorkspaceViewProps {
  onConsumeTokens: (amount: number) => void;
  onAddHistoryItem: (item: HistoryItem) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  onConsumeTokens,
  onAddHistoryItem,
}) => {
  // Active snippet and code state
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(SAMPLE_SNIPPETS[0]);
  const [code, setCode] = useState<string>(SAMPLE_SNIPPETS[0].code);
  const [fileName, setFileName] = useState<string>(SAMPLE_SNIPPETS[0].fileName);
  const [language, setLanguage] = useState<string>(SAMPLE_SNIPPETS[0].language);

  // Analysis State
  const [analysis, setAnalysis] = useState<AnalysisResult>({
    hasIssue: true,
    issueTitle: 'Potential Issue on Line 8',
    errorLine: 8,
    issueSummary: 'The loop condition i <= numbers.length might cause an out-of-bounds access.',
    whatHappened: 'The loop is attempting to access numbers[numbers.length] during its final iteration, which evaluates to undefined. Adding undefined to a number results in NaN.',
    why: 'Arrays in JavaScript are zero-indexed. This means the first element is at index 0, and the last element is at index length - 1. If an array has 3 elements, its length is 3, but valid indices are 0, 1, and 2.',
    hint: 'Consider changing the loop condition operator to strictly less than (<).',
    suggestedFix: `function calculateAverage(numbers) {\n  if (!Array.isArray(numbers) || numbers.length === 0) {\n    return 0;\n  }\n\n  let sum = 0;\n  for (let i = 0; i < numbers.length; i++) {\n    sum += numbers[i];\n  }\n\n  return sum / numbers.length;\n}\n\nconsole.log(calculateAverage([10, 20, 30]));`,
    suggestedFixExplanation: 'Replaced <= with < to iterate strictly within valid array indices (0, 1, 2).',
    optimizedCode: `function calculateAverage(numbers) {\n  if (!Array.isArray(numbers) || numbers.length === 0) return 0;\n  return numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;\n}\n\nconsole.log(calculateAverage([10, 20, 30]));`,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'chat'>('diagnostics');

  const chatEndRef = useRef<HTMLDivElement>(null);
  const codeLines = code.split('\n');

  // Switch Snippet
  const handleSelectSnippet = (snippet: CodeSnippet) => {
    setSelectedSnippet(snippet);
    setCode(snippet.code);
    setFileName(snippet.fileName);
    setLanguage(snippet.language);
    setConsoleLogs([]);
    setShowConsole(false);
    triggerAnalysis(snippet.code, snippet.language, snippet.fileName);
  };

  // Run Code
  const handleRunCode = async () => {
    setIsRunning(true);
    setShowConsole(true);
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.logs && data.logs.length > 0) {
        setConsoleLogs(data.logs);
      } else if (data.error) {
        setConsoleLogs([`Error: ${data.error}`]);
      } else {
        setConsoleLogs(['Execution completed (No output)']);
      }
    } catch (err: any) {
      setConsoleLogs([`Execution error: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  // Trigger AI Analysis
  const triggerAnalysis = async (codeToAnalyze: string, lang = language, file = fileName) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToAnalyze, language: lang, fileName: file }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setAnalysis(data.result);
        onConsumeTokens(25);
        onAddHistoryItem({
          id: String(Date.now()),
          title: data.result.issueTitle || `Analyzed ${file}`,
          fileName: file,
          language: lang,
          code: codeToAnalyze,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          issueSummary: data.result.issueSummary || 'Code review analysis',
          resolved: !data.result.hasIssue,
          tokensUsed: 25,
        });
      }
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear code
  const handleClearCode = () => {
    setCode('');
    setAnalysis({
      hasIssue: false,
      issueTitle: 'Empty Studio Buffer',
      errorLine: 0,
      issueSummary: 'Paste or compose your code here and click Analyze to begin audit.',
      whatHappened: 'No code in buffer.',
      why: 'Provide code to run automated AI diagnostics and semantic inspection.',
      hint: 'You can also select a sample from the archive dropdown above.',
      suggestedFix: '',
    });
  };

  // Quick Action Buttons
  const handleQuickAction = async (action: 'explain' | 'hint' | 'review' | 'fix' | 'optimize') => {
    if (action === 'fix' && analysis.suggestedFix) {
      setCode(analysis.suggestedFix);
      setAnalysis(prev => ({
        ...prev,
        hasIssue: false,
        issueTitle: 'Fix Applied Successfully',
        errorLine: 0,
        issueSummary: prev.suggestedFixExplanation || 'The issue has been corrected.',
      }));
      onConsumeTokens(10);
      return;
    }

    if (action === 'optimize' && analysis.optimizedCode) {
      setCode(analysis.optimizedCode);
      setAnalysis(prev => ({
        ...prev,
        hasIssue: false,
        issueTitle: 'Optimized Code Applied',
        errorLine: 0,
        issueSummary: 'Code refactored to modern idiomatic standard.',
      }));
      onConsumeTokens(15);
      return;
    }

    setActiveTab('chat');
    setIsChatLoading(true);

    const userLabel =
      action === 'explain'
        ? 'Explain this code in detail'
        : action === 'hint'
        ? 'Give me a hint'
        : action === 'review'
        ? 'Perform architectural code review'
        : action === 'fix'
        ? 'Show me the recommended fix'
        : 'Optimize this implementation';

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: userLabel,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action,
    };

    setChatMessages(prev => [...prev, newMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userLabel, code, language, action }),
      });
      const data = await res.json();
      const replyMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: data.reply || 'Analysis completed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };
      setChatMessages(prev => [...prev, replyMsg]);
      onConsumeTokens(20);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Send Custom Chat Message
  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatInput('');
    setActiveTab('chat');

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, code, language }),
      });
      const data = await res.json();
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: data.reply || "I've reviewed your inquiry against the current workspace buffer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };
      setChatMessages(prev => [...prev, botMsg]);
      onConsumeTokens(15);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const errorLineIndex = analysis.errorLine > 0 ? analysis.errorLine - 1 : -1;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)] lg:flex-row gap-4 p-4 lg:p-6 bg-[var(--bg-main)] font-sans-alt text-[var(--text-main)] overflow-hidden">
      {/* LEFT PANE: Code Editor (~60%) */}
      <div className="flex-1 flex flex-col min-w-[55%] lg:w-[58%] bg-[var(--bg-surface)] rounded border border-[var(--border-line)] shadow-2xl overflow-hidden relative">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-surface-card)] border-b border-[var(--border-line)] text-xs text-[var(--text-muted)]">
          {/* File Tab and Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--bg-main)] border border-[var(--border-line)] text-[var(--text-main)]">
              <span className="material-symbols-outlined text-[15px] text-[var(--accent)]">
                {language === 'Python' ? 'terminal' : 'javascript'}
              </span>
              <span className="font-mono text-xs font-medium">{fileName}</span>
            </div>

            {/* Language Tag */}
            <span className="px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-line)] text-[10px] text-[var(--text-muted)] font-mono uppercase">
              {language}
            </span>

            {/* Presets dropdown */}
            <div className="relative group">
              <select
                value={selectedSnippet.id}
                onChange={(e) => {
                  const s = SAMPLE_SNIPPETS.find(snip => snip.id === e.target.value);
                  if (s) handleSelectSnippet(s);
                }}
                className="bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs px-2.5 py-1 rounded border border-[var(--border-line)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
                title="Load a preset snippet"
              >
                {SAMPLE_SNIPPETS.map((snip) => (
                  <option key={snip.id} value={snip.id} className="bg-[var(--bg-surface)] text-[var(--text-main)]">
                    {snip.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons: Copy, Clear */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyCode}
              className="hover:text-[var(--accent)] text-[var(--text-muted)] transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleClearCode}
              className="hover:text-[var(--error-border)] text-[var(--text-muted)] transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">delete_sweep</span>
              Clear
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div className="flex-1 overflow-auto bg-[var(--bg-main)] relative flex select-text">
          {/* Gutter Line Numbers */}
          <div className="w-11 flex-shrink-0 bg-[var(--bg-surface)] text-right pr-3 py-4 select-none font-mono text-[var(--text-muted)]/40 border-r border-[var(--border-line)] flex flex-col gap-[2px]">
            {codeLines.map((_, idx) => {
              const lineNum = idx + 1;
              const isError = analysis.hasIssue && lineNum === analysis.errorLine;
              return (
                <div key={idx} className="relative h-[22px] flex items-center justify-end">
                  {isError && (
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--error-border)] rounded-full animate-pulse"></span>
                  )}
                  <span className={`text-[11px] font-mono ${isError ? 'text-[var(--error-border)] font-bold' : ''}`}>
                    {lineNum}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Code Text Area / Canvas */}
          <div className="relative flex-1 p-4 overflow-x-auto min-w-0">
            {/* Error Highlight Band Overlay */}
            {analysis.hasIssue && errorLineIndex >= 0 && (
              <div
                className="absolute left-0 right-0 h-[24px] bg-[var(--error-border)]/15 pointer-events-none border-l-2 border-[var(--error-border)] transition-all duration-300"
                style={{ top: `${16 + errorLineIndex * 24}px` }}
              ></div>
            )}

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full min-h-[300px] bg-transparent text-[var(--text-main)] font-mono text-[13px] leading-[24px] font-normal resize-none focus:outline-none focus:ring-0 border-none p-0 tracking-wide whitespace-pre"
              placeholder="Paste or compose your code here..."
            />
          </div>
        </div>

        {/* Collapsible Console Drawer */}
        {showConsole && (
          <div className="border-t border-[var(--border-line)] bg-[var(--bg-main)] p-3 max-h-36 overflow-y-auto animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[var(--border-line)]">
              <span className="text-[10px] uppercase font-sans-alt tracking-[0.2em] text-[var(--text-muted)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span> Terminal Output
              </span>
              <button
                onClick={() => setShowConsole(false)}
                className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
              >
                Close
              </button>
            </div>
            <pre className="font-mono text-xs text-[var(--text-main)] whitespace-pre-wrap leading-relaxed">
              {consoleLogs.length > 0 ? consoleLogs.join('\n') : 'No output.'}
            </pre>
          </div>
        )}

        {/* Editor Bottom Bar: Analyze & Run */}
        <div className="p-3 bg-[var(--bg-surface-card)] border-t border-[var(--border-line)] flex items-center justify-between gap-3">
          <div className="text-[11px] text-[var(--text-muted)] hidden sm:flex items-center gap-3 font-sans-alt">
            <span>{codeLines.length} lines</span>
            <span>•</span>
            <span>{code.length} chars</span>
            {analysis.hasIssue && (
              <span className="text-[var(--error-border)] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                Anomaly on L{analysis.errorLine}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Analyze Button */}
            <button
              onClick={() => triggerAnalysis(code)}
              disabled={isAnalyzing}
              className="px-4 py-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-line)] text-[var(--text-main)] hover:border-[var(--accent)]/50 transition-colors text-xs font-sans-alt tracking-wider uppercase font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              <span className={`material-symbols-outlined text-[16px] text-[var(--accent)] ${isAnalyzing ? 'animate-spin' : ''}`}>
                {isAnalyzing ? 'sync' : 'auto_awesome'}
              </span>
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>

            {/* Run Button */}
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-5 py-1.5 rounded bg-[var(--accent)] text-[#090d16] hover:opacity-90 transition-all font-sans-alt tracking-wider uppercase font-semibold text-xs shadow-md active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isRunning ? 'hourglass_top' : 'play_arrow'}
              </span>
              {isRunning ? 'Running...' : 'Execute'}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: AI Assistant (~40%) */}
      <div className="flex-1 lg:w-[42%] flex flex-col bg-[var(--bg-surface)] rounded border border-[var(--border-line)] shadow-2xl relative overflow-hidden">
        {/* Assistant Header */}
        <div className="px-5 py-3 border-b border-[var(--border-line)] flex items-center justify-between bg-[var(--bg-surface-card)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent)] text-[18px]">psychology</span>
            <h2 className="font-serif text-[16px] font-medium text-[var(--text-main)]">Diagnostic Assistant</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Tabs */}
            <div className="flex bg-[var(--bg-main)] rounded p-0.5 border border-[var(--border-line)] text-[10px] font-sans-alt">
              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'diagnostics' ? 'bg-[var(--accent)] text-[#090d16] font-semibold' : 'text-[var(--text-muted)]'
                }`}
              >
                Diagnostics
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'chat' ? 'bg-[var(--accent)] text-[#090d16] font-semibold' : 'text-[var(--text-muted)]'
                }`}
              >
                Chat {chatMessages.length > 0 && `(${chatMessages.length})`}
              </button>
            </div>

            {/* Status pill */}
            <span className="flex items-center gap-1.5 text-[var(--accent)] bg-[var(--accent-badge-bg)] px-2.5 py-0.5 rounded border border-[var(--accent)]/30 text-[10px] uppercase font-sans-alt tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
              {isAnalyzing ? 'Analyzing' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Assistant Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'diagnostics' ? (
            <>
              {/* Potential Issue Alert Card */}
              {analysis.hasIssue ? (
                <div className="bg-[var(--error-bg)] border border-[var(--error-border)]/50 rounded p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--error-border)]"></div>
                  <h3 className="font-serif font-medium text-[var(--error-text)] flex items-center gap-2 mb-2 text-sm">
                    <span className="material-symbols-outlined text-[18px] text-[var(--error-border)]">warning</span>
                    {analysis.issueTitle}
                  </h3>
                  <p className="font-sans-alt text-[var(--text-main)]/90 leading-relaxed text-xs">
                    {analysis.issueSummary}
                  </p>
                </div>
              ) : (
                <div className="bg-[var(--success-bg)] border border-[var(--success-border)]/50 rounded p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--success-border)]"></div>
                  <h3 className="font-serif font-medium text-[var(--success-text)] flex items-center gap-2 mb-1 text-sm">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    No Critical Issues Detected
                  </h3>
                  <p className="font-sans-alt text-[var(--text-muted)] text-xs">
                    {analysis.issueSummary || 'The code structure looks clean and passed static heuristics.'}
                  </p>
                </div>
              )}

              {/* What Happened & Why Sections */}
              <div className="space-y-4">
                {/* WHAT HAPPENED? */}
                <div>
                  <h4 className="text-[10px] uppercase font-sans-alt tracking-[0.25em] text-[var(--accent)] mb-1.5 font-semibold">
                    What Happened?
                  </h4>
                  <div className="bg-[var(--bg-surface-card)] p-3.5 rounded border border-[var(--border-line)] text-[var(--text-main)] text-xs leading-relaxed font-sans-alt">
                    {analysis.whatHappened}
                  </div>
                </div>

                {/* WHY? */}
                <div>
                  <h4 className="text-[10px] uppercase font-sans-alt tracking-[0.25em] text-[var(--accent)] mb-1.5 font-semibold">
                    Architectural Reason
                  </h4>
                  <div className="bg-[var(--bg-surface-card)] p-3.5 rounded border border-[var(--border-line)] text-[var(--text-main)] text-xs leading-relaxed font-sans-alt">
                    {analysis.why}
                  </div>
                </div>

                {/* HINT */}
                {analysis.hint && (
                  <div className="bg-[var(--bg-surface-card)] border border-[var(--accent)]/30 rounded p-3.5 flex gap-3 items-start shadow-sm">
                    <span className="material-symbols-outlined text-[var(--accent)] text-[18px] mt-0.5 flex-shrink-0">
                      lightbulb
                    </span>
                    <div>
                      <h4 className="font-serif font-medium text-[var(--accent)] mb-1 text-xs">Advisory Note</h4>
                      <p className="font-sans-alt text-[var(--text-muted)] text-xs leading-relaxed">
                        {analysis.hint}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Chips */}
              <div className="pt-3 border-t border-[var(--border-line)]">
                <div className="text-[10px] uppercase font-sans-alt tracking-[0.25em] text-[var(--text-muted)] mb-2 font-semibold">
                  Surgical Directives
                </div>
                <div className="flex flex-wrap gap-2 font-sans-alt">
                  <button
                    onClick={() => handleQuickAction('explain')}
                    className="px-3 py-1.5 text-xs rounded bg-[var(--bg-surface-card)] border border-[var(--border-line)] hover:border-[var(--accent)]/50 transition-all text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    Explain
                  </button>
                  <button
                    onClick={() => handleQuickAction('hint')}
                    className="px-3 py-1.5 text-xs rounded bg-[var(--bg-surface-card)] border border-[var(--border-line)] hover:border-[var(--accent)]/50 transition-all text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    Give Hint
                  </button>
                  <button
                    onClick={() => handleQuickAction('review')}
                    className="px-3 py-1.5 text-xs rounded bg-[var(--bg-surface-card)] border border-[var(--border-line)] hover:border-[var(--accent)]/50 transition-all text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    Review Code
                  </button>
                  <button
                    onClick={() => handleQuickAction('fix')}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[var(--accent-badge-bg)] border border-[var(--accent)]/50 hover:bg-[var(--accent)]/20 transition-all text-[var(--accent)] cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                    Apply Fix
                  </button>
                  <button
                    onClick={() => handleQuickAction('optimize')}
                    className="px-3 py-1.5 text-xs rounded bg-[var(--bg-surface-card)] border border-[var(--border-line)] hover:border-[var(--accent)]/50 transition-all text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  >
                    Optimize
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* CHAT TAB */
            <div className="space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)]">
                  <span className="material-symbols-outlined text-3xl text-[var(--accent)]/40 mb-2">chat</span>
                  <p className="text-xs font-sans-alt">Inquire about your algorithms or invoke quick actions above to analyze your codebase.</p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] rounded p-3.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[var(--accent)] text-[#090d16] font-sans-alt font-medium'
                          : 'bg-[var(--bg-surface-card)] text-[var(--text-main)] border border-[var(--border-line)] shadow-sm font-sans-alt'
                      }`}
                    >
                      <pre className="font-sans-alt whitespace-pre-wrap">{msg.text}</pre>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 px-1 font-mono">{msg.timestamp}</span>
                  </div>
                ))
              )}
              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-[var(--accent)] bg-[var(--bg-surface-card)] p-3 rounded border border-[var(--accent)]/30 w-fit">
                  <span className="material-symbols-outlined text-[15px] animate-spin">sync</span>
                  Synthesizing consultation...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Assistant Bottom Chat Input */}
        <div className="p-4 bg-[var(--bg-surface-card)] border-t border-[var(--border-line)] relative z-10">
          <form onSubmit={handleSendChat} className="relative flex items-center bg-[var(--bg-main)] rounded border border-[var(--border-line)] focus-within:border-[var(--accent)] transition-all shadow-sm">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Inquire about code semantics..."
              className="w-full bg-transparent border-none px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-0 text-xs font-sans-alt"
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isChatLoading}
              className="p-2 mr-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded hover:bg-white/[0.04] disabled:opacity-40 cursor-pointer"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-[18px] block" style={{ fontVariationSettings: "'FILL' 1" }}>
                send
              </span>
            </button>
          </form>
        </div>

        {/* Ambient background blur dot */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-3xl rounded-full pointer-events-none -mb-10 -mr-10"></div>
      </div>
    </div>
  );
};
