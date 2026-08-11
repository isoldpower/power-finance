import type { Tone } from "@shared/formatting";

type ActionType = 'recurring' | 'duplicate' | 'uncategorized';

interface ActionLabels {
	primary: string;
	secondary: string;
}

interface Action {
	id: string;
	kind: ActionType;
	title: string;
	subtitle: string;
}

export type { ActionType, Action, ActionLabels };

interface AssistantSignal {
	label: string;
	value: string;
	tone: Tone;
}

interface AssistantMessage {
	id: string;
	role: 'assistant' | 'user';
	text: string;
	refs?: string[];
}

interface AssistantContent {
	signals: AssistantSignal[];
	chat: AssistantMessage[];
	prompts: string[];
}

export type { AssistantSignal, AssistantMessage, AssistantContent };
