const REQUIRED_KEYS = [
	'CLIENT_CLERK_PUBLIC_KEY',
	'CLIENT_API_BASE_URL',
	'CLIENT_API_MODE',
] as const;

type RequiredEnvKey = typeof REQUIRED_KEYS[number];

const checkEnvVariables = (
	defaults: Partial<ImportMetaEnv> = {}
): ImportMetaEnv => {
	const realEnv = import.meta.env as Partial<ImportMetaEnv>;
	const requiredDictionary = REQUIRED_KEYS.reduce<Record<RequiredEnvKey, string | undefined>>(
		(dictionary, key) => ({ ...dictionary, [key]: realEnv[key] ?? defaults[key] }),
		{} as Record<RequiredEnvKey, string | undefined>
	);

	const undefinedEntries = Object.entries(requiredDictionary).filter(([, value]) => value === undefined);
	const receivedEntries = Object.entries(requiredDictionary).filter(([, value]) => value !== undefined);

	if (undefinedEntries.length > 0) {
		throw new Error('Your .env file is not configured correctly. \n' +
			`Expected variables: ${Object.keys(requiredDictionary).join(', ')}\n` +
			`Received variables: ${receivedEntries.join(', ')}\n` +
			`Missing variables: ${undefinedEntries.join(', ')}\n`);
	}

	return {
		...import.meta.env,
		...requiredDictionary,
		CLIENT_API_SANDBOX: realEnv.CLIENT_API_SANDBOX ?? defaults.CLIENT_API_SANDBOX,
	} as ImportMetaEnv;
}

export { checkEnvVariables };
