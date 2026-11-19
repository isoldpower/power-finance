import { INFLOW_COLOR, OUTFLOW_COLOR } from "@shared/charts";

import type { FlowSide } from "./types.ts";


const SIDES: FlowSide[] = ['inflow', 'outflow'];
const SIDE_COLOR: Record<FlowSide, string> = { inflow: INFLOW_COLOR, outflow: OUTFLOW_COLOR };
const BUCKET_PADDING = 0.28;
const SIDE_PADDING = 0.12;
const STAGGER_MS = 18;

export { BUCKET_PADDING, SIDE_COLOR, SIDE_PADDING, SIDES, STAGGER_MS };
