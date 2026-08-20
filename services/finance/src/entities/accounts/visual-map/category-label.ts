import type { AccountGroup } from "@entity/accounts";

const CATEGORY_LABEL: Record<AccountGroup, string> = {
	assets: 'Assets',
	liabilities: 'Liabilities',
	equity: 'Equity',
};

export { CATEGORY_LABEL };