import {QueryClient} from "@tanstack/react-query";

type QueryCache = ReturnType<QueryClient['getQueryCache']>
type SubscribeCallback = Parameters<QueryCache['subscribe']>[0];
type QueryCompareArgument = Parameters<SubscribeCallback>[0];

type MutationCache = ReturnType<QueryClient['getMutationCache']>
type MutationSubscribeCallback = Parameters<MutationCache['subscribe']>[0];
type MutationCompareArgument = Parameters<MutationSubscribeCallback>[0];

interface QueryReaction {
	compare: (event: QueryCompareArgument) => boolean;
	reaction: (data: unknown) => void;
}

interface MutationReaction {
	compare: (event: MutationCompareArgument) => boolean;
	reaction: (data: unknown) => void;
}

export type { 
	QueryCache,
	SubscribeCallback,
	QueryCompareArgument,
	
	MutationCache,
	MutationSubscribeCallback,
	MutationCompareArgument,
	
	MutationReaction,
	QueryReaction,
}