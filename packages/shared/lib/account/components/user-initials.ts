const userInitials = (firstName?: string | null, lastName?: string | null): string => (
	((firstName ?? 'N')[0] + (lastName ?? 'A')[0]).toUpperCase()
);

export { userInitials };
