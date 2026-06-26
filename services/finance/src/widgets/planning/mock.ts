// TODO wire to backend — Planning screen is fully presentational for now.

import type { Tone } from "../management/mock.ts";

export interface MockRule {
	id: string;
	icon: string;
	name: string;
	statusText: string;
	statusTone: 'pos' | 'warn' | 'neutral';
	trigger: string;
	action: string;
	frequency: string;
	enabled: boolean;
}

export interface MockGoal {
	id: string;
	icon: string;
	color: string;
	name: string;
	monthly: string;
	eta: string;
	saved: string;
	target: string;
	percent: number;
}

export interface MockSignal {
	label: string;
	value: string;
	tone: Tone;
}

export interface MockChatMessage {
	id: string;
	role: 'assistant' | 'user';
	text: string;
	refs?: string[];
}

export const MOCK_RULES: MockRule[] = [
	{ id: 'r1', icon: '🏷', name: 'Auto-categorize coffee shops', statusText: 'active', statusTone: 'pos', trigger: 'merchant ~ "coffee"', action: 'set category Dining', frequency: 'realtime', enabled: true },
	{ id: 'r2', icon: '💸', name: 'Sweep to Emergency Fund', statusText: 'active', statusTone: 'pos', trigger: 'balance > $8,000', action: 'transfer $250', frequency: 'monthly', enabled: true },
	{ id: 'r3', icon: '🔔', name: 'Alert on large charge', statusText: 'active', statusTone: 'pos', trigger: 'expense > $500', action: 'notify me', frequency: 'realtime', enabled: true },
	{ id: 'r4', icon: '📊', name: 'Weekly spending digest', statusText: 'paused', statusTone: 'warn', trigger: 'every Monday', action: 'email summary', frequency: 'weekly', enabled: false },
	{ id: 'r5', icon: '🧾', name: 'Flag missing receipts', statusText: 'active', statusTone: 'pos', trigger: 'expense > $75 no receipt', action: 'add to needs-action', frequency: 'daily', enabled: true },
];

export const MOCK_GOALS: MockGoal[] = [
	{ id: 'g1', icon: '🛟', color: 'linear-gradient(135deg,#0ca678,#1098ad)', name: 'Emergency fund', monthly: '$300/mo', eta: 'on track · Apr 2027', saved: '$9,800', target: '$15,000', percent: 65 },
	{ id: 'g2', icon: '✈', color: 'linear-gradient(135deg,#4f46e5,#8b5cf6)', name: 'Japan trip', monthly: '$200/mo', eta: 'ahead · Nov 2026', saved: '$2,400', target: '$4,000', percent: 60 },
	{ id: 'g3', icon: '🏠', color: 'linear-gradient(135deg,#e8920c,#f76707)', name: 'House down payment', monthly: '$800/mo', eta: 'behind · 2031', saved: '$12,500', target: '$80,000', percent: 16 },
];

export const MOCK_SIGNALS: MockSignal[] = [
	{ label: 'Savings rate', value: '59%', tone: 'pos' },
	{ label: 'Runway', value: '8.4 mo', tone: 'pos' },
	{ label: 'Debt ratio', value: '3.4%', tone: 'pos' },
	{ label: 'Spending Δ', value: '+12%', tone: 'neg' },
];

export const MOCK_CHAT: MockChatMessage[] = [
	{ id: 'c1', role: 'assistant', text: 'Your savings rate held at 59% this month — strong. The main drag is dining, up 12% vs your trailing average.', refs: ['Cash flow · June', 'Dining'] },
	{ id: 'c2', role: 'user', text: 'How much sooner could I hit my emergency fund if I cut dining?' },
	{ id: 'c3', role: 'assistant', text: 'Cutting dining by ~$150/mo would move your Emergency fund ETA forward by about 2 months, to Feb 2027 — without touching other goals.', refs: ['Emergency fund', 'What-if'] },
];

export const MOCK_PROMPTS = [
	'Where can I save $200?',
	'Am I on track for Japan?',
	'Explain my spending spike',
];
