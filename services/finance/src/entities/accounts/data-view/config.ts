import type { AccountGroup } from "../types.ts";


const CATEGORY_ID: Record<AccountGroup, string> = {
	assets: 'assets',
	liabilities: 'liabilities',
	equity: 'equity',
	ungrouped: 'ungrouped',
};

const CATEGORY_ORDER: AccountGroup[] = ['assets', 'liabilities', 'equity'];

const SHADE_STEP = 0.17;

const SHADE_FADE_LIMIT = 0.72;

export { CATEGORY_ID, CATEGORY_ORDER, SHADE_FADE_LIMIT, SHADE_STEP };
