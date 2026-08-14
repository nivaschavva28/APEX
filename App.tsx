import React, { useState } from 'react';
import { ViewMode, HistoryItem, AppSettings } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LandingView } from './components/LandingView';
import { WorkspaceView } from './components/WorkspaceView';
import { HistoryView } from './components/HistoryView';
import { DocumentationView } from './components/DocumentationView';
import { SettingsView } from './components/SettingsView';
import { CommandSearchModal } from './components/CommandSearchModal';
import { WaitlistModal } from './components/WaitlistModal';
import { DemoVideoModal } from './components/DemoVideoModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('workspace');
  const [tokensUsed, setTokensUsed] = useState<number>(750);
  const totalTokens = 1000;

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Settings
  const [settings, setSettings] = useState<AppSettings>({
    model: 'gemini-3.7-flash',
    temperature: 0.2,
    autoAnalyze: true,
    fontSize: 13,
    theme: 'indigo',
    tabSize: 2,
  });

  // History
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'Potential Issue on Line 8',
      fileName: 'main.js',
      language: 'JavaScript',
      code: `function calculateAverage(numbers) {\n  if (!Array.isArray(numbers) || numbers.length === 0) return 0;\n  let sum = 0;\n  for (let i = 0; i <= numbers.length; i++) {\n    sum += numbers[i];\n  }\n  return sum / numbers.length;\n}`,
      timestamp: '10:42 AM',
      issueSummary: 'Loop condition i <= numbers.length causes out-of-bounds array access (NaN)',
      resolved: false,
      tokensUsed: 25,
    },
    {
      id: '2',
      title: 'Missing useEffect Dependency',
      fileName: 'useUserData.ts',
      language: 'TypeScript',
      code: `useEffect(() => { fetchData(); }, []);`,
      timestamp: 'Yesterday',
      issueSummary: 'Missing userId in dependency array causes stale closure fetches',
      resolved: true,
      tokensUsed: 40,
    },
    {
      id: '3',
      title: 'Unhandled Async Callback in forEach',
      fileName: 'paymentProcessor.js',
      language: 'JavaScript',
      code: `transactions.forEach(async (tx) => { ... });`,
      timestamp: '2 days ago',
      issueSummary: 'Array.prototype.forEach does not await async promises',
      resolved: true,
      tokensUsed: 35,
    },
  ]);

  const handleConsumeTokens = (amount: number) => {
    setTokensUsed((prev) => Math.min(totalTokens, prev + amount));
  };

  const handleResetTokens = () => {
    setTokensUsed(250);
  };

  const handleAddHistoryItem = (item: HistoryItem) => {
    setHistoryItems((prev) => [item, ...prev]);
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div
      data-theme={settings.theme}
      style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
      className="min-h-screen selection:bg-[var(--accent)]/30 selection:text-[var(--accent)] flex flex-col font-sans-alt transition-colors duration-300"
    >
      {/* Top Fixed Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentTheme={settings.theme}
        onSelectTheme={(t) => handleUpdateSettings({ theme: t })}
      />

      {/* Main Container */}
      <div className="flex pt-14 min-h-[calc(100vh-3.5rem)]">
        {/* Left Sidebar (Only visible when not in pure full-width landing view) */}
        {currentView !== 'landing' && (
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            tokensUsed={tokensUsed}
            totalTokens={totalTokens}
          />
        )}

        {/* Dynamic Main View Area */}
        <main
          className={`flex-1 flex flex-col overflow-x-hidden ${
            currentView !== 'landing' ? 'lg:pl-64 pl-0' : 'pl-0'
          }`}
        >
          {currentView === 'landing' && (
            <LandingView
              onNavigate={setCurrentView}
              onOpenWaitlist={() => setIsWaitlistOpen(true)}
              onOpenDemo={() => setIsDemoOpen(true)}
            />
          )}

          {currentView === 'workspace' && (
            <WorkspaceView
              onConsumeTokens={handleConsumeTokens}
              onAddHistoryItem={handleAddHistoryItem}
            />
          )}

          {currentView === 'history' && (
            <HistoryView
              historyItems={historyItems}
              onLoadSnippet={(snippetCode, _name, _lang) => {
                // Workspace handles selection
                setCurrentView('workspace');
              }}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'documentation' && (
            <DocumentationView onNavigate={setCurrentView} />
          )}

          {currentView === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              tokensUsed={tokensUsed}
              totalTokens={totalTokens}
              onResetTokens={handleResetTokens}
              onNavigate={setCurrentView}
            />
          )}
        </main>
      </div>

      {/* Interactive Global Modals */}
      <CommandSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setCurrentView}
        onLoadSnippet={() => setCurrentView('workspace')}
      />

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      <DemoVideoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onNavigate={setCurrentView}
      />
    </div>
  );
}
