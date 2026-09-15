import type { FilterOperator } from "@shared/api";
import type { Money } from "@entity/localization";
import type { Types } from "@shared/formatting";
import type { Pending } from "@shared/data";


type Severity = 'info' | 'warning' | 'critical';

interface ResourceRef {
	type: string;
	id: string;
}

type ActionSource = 'assistant' | 'scheduler';

type ActionStatus = 'pending' | 'resolved' | 'dismissed' | 'expired';

type ResolutionIntent = 'primary' | 'secondary' | 'danger';

interface ActionResolution {
	id: string;
	label: string;
	intent: ResolutionIntent;
	applies: boolean;
}

interface Action extends Pending {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	source: ActionSource;
	kind: string;
	severity: Severity;
	status: ActionStatus;
	title: string;
	body: string;
	subject: ResourceRef | null;
	money: Money | null;
	groupKey: string | null;
	occurrences: number;
	lastSeenAt: string;
	expiresAt: string | null;
	resolvedAt: string | null;
	resolutions: ActionResolution[];
}

interface ActionQuery {
	status?: ActionStatus;
	source?: ActionSource;
	severity?: Severity;
}

interface Notification extends Pending {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	severity: Severity;
	title: string;
	body: string;
	subject: ResourceRef | null;
	acknowledgedAt: string | null;
}

interface NotificationCounts {
	unacknowledged: number;
	total: number;
}

interface NotificationQuery {
	acknowledged?: boolean;
	severity?: Severity;
}

type RuleCombinator = 'and' | 'or';

interface RuleCondition {
	field: string;
	operator: FilterOperator;
	value: string | string[];
}

interface RuleConditionGroup {
	combinator: RuleCombinator;
	nodes: RuleNode[];
}

type RuleNode = RuleCondition | RuleConditionGroup;

type AutomationTriggerType = 'event' | 'schedule';

type AutomationEvent = 'transaction.created' | 'transaction.updated';

type AutomationSchedule = 'daily' | 'weekly' | 'monthly';

interface AutomationTrigger {
	type: AutomationTriggerType;
	event: AutomationEvent | null;
	schedule: AutomationSchedule | null;
	condition: RuleNode | null;
}

interface SetCategoryEffect {
	type: 'set_category';
	category: string;
}

interface NotifyEffect {
	type: 'notify';
	severity: Severity;
	title: string;
}

interface RaiseActionEffect {
	type: 'raise_action';
	severity: Severity;
	title: string;
	body: string;
}

interface TransferEffect {
	type: 'transfer';
	fromWalletId: string;
	toWalletId: string;
	money: Money;
}

interface UnknownEffect {
	type: 'unknown';
	name: string;
}

type AutomationEffect =
	| SetCategoryEffect
	| NotifyEffect
	| RaiseActionEffect
	| TransferEffect
	| UnknownEffect;

interface Automation extends Pending {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	name: string;
	icon: string;
	enabled: boolean;
	trigger: AutomationTrigger;
	effects: AutomationEffect[];
	lastRunAt: string | null;
	runs: number;
}

interface AutomationDraft {
	name: string;
	icon: string;
	enabled: boolean;
	trigger: AutomationTrigger;
	effects: AutomationEffect[];
}

interface AutomationPatch {
	name?: string;
	icon?: string;
	enabled?: boolean;
	trigger?: AutomationTrigger;
	effects?: AutomationEffect[];
}

interface AutomationQuery {
	enabled?: boolean;
}

interface AutomationSearchQuery {
	name?: string;
	enabled?: boolean;
	triggerTypes?: AutomationTriggerType[];
	events?: AutomationEvent[];
	schedules?: AutomationSchedule[];
	createdAfter?: string;
	createdBefore?: string;
	ranAfter?: string;
	ranBefore?: string;
}

interface AssistantSignal {
	label: string;
	value: string;
	tone: Types;
}

interface AssistantOverview {
	signals: AssistantSignal[];
	prompts: string[];
}

type MessageRole = 'user' | 'assistant';

type MessageStatus = 'complete' | 'streaming' | 'failed';

interface AssistantMessage extends Pending {
	id: string;
	createdAt: string;
	role: MessageRole;
	status: MessageStatus;
	text: string;
	refs: ResourceRef[];
}

interface AssistantReply {
	userMessageId: string;
	messageId: string;
	message: AssistantMessage;
}

export type {
	Action,
	ActionQuery,
	ActionResolution,
	ActionSource,
	ActionStatus,
	AssistantMessage,
	AssistantOverview,
	AssistantReply,
	AssistantSignal,
	Automation,
	AutomationDraft,
	AutomationEffect,
	AutomationEvent,
	AutomationPatch,
	AutomationQuery,
	AutomationSearchQuery,
	AutomationSchedule,
	AutomationTrigger,
	AutomationTriggerType,
	MessageRole,
	MessageStatus,
	NotifyEffect,
	Notification,
	NotificationCounts,
	NotificationQuery,
	RaiseActionEffect,
	ResolutionIntent,
	ResourceRef,
	RuleCombinator,
	RuleCondition,
	RuleConditionGroup,
	RuleNode,
	SetCategoryEffect,
	Severity,
	TransferEffect,
	UnknownEffect,
};
