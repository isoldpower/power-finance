import { resourceRefFromApi } from "@feature/assistance/actions-api";
import type { AssistantMessage, AssistantOverview, AssistantSignal } from "@entity/assistance";
import type { Tone } from "@shared/formatting";
import type { AssistantMessageDto, AssistantOverviewDto, AssistantSignalDto, SignalToneDto } from "../types.ts";

const TONE_BY_SIGNAL: Record<SignalToneDto, Tone> = {
	positive: 'pos',
	negative: 'neg',
	neutral: 'neutral',
	muted: 'muted',
};

const signalFromApi = (dto: AssistantSignalDto): AssistantSignal => ({
	label: dto.label,
	value: dto.value,
	tone: TONE_BY_SIGNAL[dto.tone],
});

const overviewFromApi = (dto: AssistantOverviewDto): AssistantOverview => ({
	signals: dto.signals.map(signalFromApi),
	prompts: [...dto.prompts],
});

const assistantMessageFromApi = (dto: AssistantMessageDto): AssistantMessage => ({
	id: dto.id,
	createdAt: dto.created_at,
	role: dto.role,
	status: dto.status,
	text: dto.text,
	refs: dto.refs.map(resourceRefFromApi),
});

export { assistantMessageFromApi, overviewFromApi, signalFromApi };
