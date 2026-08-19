import { UpdatableRouteOptions } from "@tanstack/react-router";

type FxTypeMap = Record<FxType, FxObject>
type FxType = 'default-page';
type FxObject = Pick<
	UpdatableRouteOptions<never, never, never, never, never, never, never, never, never, never>,
	'errorComponent' | 'pendingComponent'
>;

export type { FxType, FxTypeMap, FxObject };