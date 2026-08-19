function serializeAmount(amount: number, decimals = 2): string {
	const normalized = Object.is(amount, -0) 
		? 0 
		: amount;

	return normalized.toFixed(decimals);
}

export { serializeAmount };
