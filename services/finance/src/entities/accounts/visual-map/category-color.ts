const CATEGORY_COLOR: Record<string, string> = {
	assets: 'var(--pos)',
	liabilities: 'var(--neg)',
	equity: 'var(--viol)',
};

const categoryColor = (categoryId: string): string => {
	return CATEGORY_COLOR[categoryId] ?? 'var(--viol)';
}

export { categoryColor };
