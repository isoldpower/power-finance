import type { AccountGroup } from "../types.ts";


const CATEGORY_ID: Record<AccountGroup, string> = {
	assets: 'assets',
	liabilities: 'liabilities',
	equity: 'equity',
};

const CATEGORY_ORDER: AccountGroup[] = ['assets', 'liabilities', 'equity'];

const SHADE_MIN = 42;

const SHADE_MAX = 100;

export { CATEGORY_ID, CATEGORY_ORDER, SHADE_MIN, SHADE_MAX };
