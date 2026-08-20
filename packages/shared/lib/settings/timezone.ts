const resolvedCache = new Map<string, string>();

const systemTimezone = (): string => {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch {
		return 'UTC';
	}
};

const isUsableTimezone = (timezone: string): boolean => {
	try {
		return new Intl.DateTimeFormat(undefined, { timeZone: timezone })
			.resolvedOptions().timeZone !== undefined;
	} catch {
		return false;
	}
};

const resolveTimezone = (timezone?: string | null): string => {
	const candidate = timezone?.trim() ?? '';
	if (!candidate) {
		return systemTimezone();
	}

	const cached = resolvedCache.get(candidate);
	if (cached) {
		return cached;
	}

	const resolved = isUsableTimezone(candidate) 
		? candidate 
		: systemTimezone();
	resolvedCache.set(candidate, resolved);

	return resolved;
};

export { resolveTimezone, systemTimezone };
