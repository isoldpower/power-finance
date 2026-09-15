import type { QueryCompareArgument, MutationCompareArgument } from "../query-reactions/types.ts";


type ApiToastPhase = 'requested' | 'succeeded' | 'failed';

interface ApiToastEvent {
	id: string;
	key: string;
	phase: ApiToastPhase;
	error?: unknown;
}

export type { ApiToastEvent, ApiToastPhase, QueryCompareArgument, MutationCompareArgument };
