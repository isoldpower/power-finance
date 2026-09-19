import type { AssistantMessage, MessageRole } from "../types.ts";


const ROLE_ORDER: Record<MessageRole, number> = { user: 0, assistant: 1 };

const compareText = (
	left: string,
	right: string,
): number => (
	left < right ? -1 : left > right ? 1 : 0
);

const compareSentAt = (
	left: string,
	right: string,
): number => {
	const leftAt = Date.parse(left);
	const rightAt = Date.parse(right);

	if (Number.isNaN(leftAt) || Number.isNaN(rightAt)) {
		return compareText(left, right);
	}

	return leftAt - rightAt;
};

const compareTurns = (
	left: AssistantMessage,
	right: AssistantMessage,
): number => {
	const bySentAt = compareSentAt(left.createdAt, right.createdAt);
	const byRole = ROLE_ORDER[left.role] - ROLE_ORDER[right.role];
	if (bySentAt !== 0) {
		return bySentAt;
	}

	return byRole !== 0 ? byRole : compareText(left.id, right.id);
};

const chatHistory = (
	messages: AssistantMessage[]
): AssistantMessage[] => (
	[...messages].sort(compareTurns)
);

export { chatHistory };
