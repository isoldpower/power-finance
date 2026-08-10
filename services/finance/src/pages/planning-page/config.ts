import type {AssistantMessage, AssistantSignal} from "@entity/assistance";


const MOCK_SIGNALS: AssistantSignal[] = [
	{ label: 'Savings rate', value: '59%', tone: 'pos' },
	{ label: 'Runway', value: '8.4 mo', tone: 'pos' },
	{ label: 'Debt ratio', value: '3.4%', tone: 'pos' },
	{ label: 'Spending Δ', value: '+12%', tone: 'neg' },
];

const MOCK_CHAT: AssistantMessage[] = [
	{ id: 'c1', role: 'assistant', text: 'Your savings rate held at 59% this month — strong. The main drag is dining, up 12% vs your trailing average.', refs: ['Cash flow · June', 'Dining'] },
	{ id: 'c2', role: 'user', text: 'How much sooner could I hit my emergency fund if I cut dining?' },
	{ id: 'c3', role: 'assistant', text: 'Cutting dining by ~$150/mo would move your Emergency fund ETA forward by about 2 months, to Feb 2027 — without touching other goals.', refs: ['Emergency fund', 'What-if'] },
];

const MOCK_PROMPTS: string[] = [
	'Where can I save $200?',
	'Am I on track for Japan?',
	'Explain my spending spike',
];

const assistantContent = {
	signals: MOCK_SIGNALS,
	chat: MOCK_CHAT,
	prompts: MOCK_PROMPTS,
};

export { assistantContent };