export type ViewMode = 'workspace' | 'landing' | 'history' | 'documentation' | 'settings';

export interface AnalysisResult {
  hasIssue: boolean;
  issueTitle: string;
  errorLine: number;
  issueSummary: string;
  whatHappened: string;
  why: string;
  hint: string;
  suggestedFix: string;
  suggestedFixExplanation?: string;
  optimizedCode?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: 'explain' | 'hint' | 'review' | 'fix' | 'optimize';
  source?: 'gemini' | 'local';
}

export interface CodeSnippet {
  id: string;
  name: string;
  fileName: string;
  language: string;
  description: string;
  code: string;
  defaultErrorLine: number;
  tags: string[];
}

export interface HistoryItem {
  id: string;
  title: string;
  fileName: string;
  language: string;
  code: string;
  timestamp: string;
  issueSummary: string;
  resolved: boolean;
  tokensUsed: number;
}

export type ThemeId = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose';

export interface AppSettings {
  model: string;
  temperature: number;
  autoAnalyze: boolean;
  fontSize: number;
  theme: ThemeId;
  tabSize: number;
}
