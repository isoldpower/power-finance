import type { AssistantMessageDto, AssistantOverviewDto } from "../types.ts";

const ASSISTANT_MESSAGES_STORAGE_KEY = 'assistant-messages-v1';

type StoredMessage = AssistantMessageDto;

const SEED_OVERVIEW: AssistantOverviewDto = {
	signals: [
		{ label: 'Savings rate', value: '59%', tone: 'positive' },
		{ label: 'Runway', value: '8.4 months', tone: 'positive' },
		{ label: 'Debt ratio', value: '3.4%', tone: 'positive' },
		{ label: 'Dining vs last month', value: '+12%', tone: 'negative' },
	],
	prompts: [
		'Where can I save 200.00 USD?',
		'Am I on track for Japan?',
		'Explain my spending spike',
	],
};

const SEED_MESSAGES: Omit<StoredMessage, 'id' | 'created_at'>[] = [
	{
		role: 'assistant',
		status: 'complete',
		text: 'Your savings rate held at 59% this month — strong. The main drag is dining, up 12% against your trailing average.',
		refs: [],
	},
	{
		role: 'user',
		status: 'complete',
		text: 'How much sooner could I hit my emergency fund if I cut dining?',
		refs: [],
	},
	{
		role: 'assistant',
		status: 'complete',
		text: 'Cutting dining by about 150.00 USD a month moves the Emergency fund date forward by roughly two months, to February 2027, without touching your other goals.',
		refs: [],
	},
];

const MOCK_REPLY = 'Dining is the largest mover this month at 412.30 USD, up 38% from July. Four weekend restaurant visits account for most of the increase.';

export { ASSISTANT_MESSAGES_STORAGE_KEY, MOCK_REPLY, SEED_MESSAGES, SEED_OVERVIEW };
export type { StoredMessage };
