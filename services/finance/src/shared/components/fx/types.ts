import {UpdatableRouteOptions} from "@tanstack/react-router";

type FxType = 'default-page';
type FxObject = Pick<UpdatableRouteOptions<any, any, any, any, any, any, any, any, any, any>, 'errorComponent' | 'pendingComponent'>;
type FxTypeMap = Record<FxType, FxObject>

export type { FxType, FxTypeMap, FxObject };