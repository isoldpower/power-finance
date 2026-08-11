import type { AccountType } from "../types.ts";


const CATEGORY_ID: Record<AccountType, string> = {
	asset: 'assets',
	liability: 'liabilities',
	equity: 'equity',
};

const CATEGORY_LABEL: Record<AccountType, string> = {
	asset: 'Assets',
	liability: 'Liabilities',
	equity: 'Equity',
};

const CATEGORY_ORDER: AccountType[] = ['asset', 'liability', 'equity'];

const SHADE_MIN = 42;

const SHADE_MAX = 100;

export { CATEGORY_ID, CATEGORY_LABEL, CATEGORY_ORDER, SHADE_MIN, SHADE_MAX };
