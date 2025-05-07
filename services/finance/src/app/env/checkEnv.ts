const checkEnvVariables = (
	defaults: Partial<ImportMetaEnv> = {}
): ImportMetaEnv => {
	const realEnv = import.meta.env as Partial<ImportMetaEnv>;
	const envDictionary: Record<keyof ImportMetaEnv, ImportMetaEnv[keyof ImportMetaEnv] | undefined> = {
		...import.meta.env,
		CLIENT_CLERK_PUBLIC_KEY: realEnv.CLIENT_CLERK_PUBLIC_KEY ?? defaults.CLIENT_CLERK_PUBLIC_KEY,
	};

	const undefinedEntries = Object.entries(envDictionary).filter(([, value]) => value === undefined);
	const receivedEntries = Object.entries(envDictionary).filter(([, value]) => value !== undefined);

	if (Object.entries(envDictionary).find(([, value]) => value === undefined)) {
		throw new Error('Your .env file is not configured correctly. \n' +
			`Expected variables: ${Object.keys(envDictionary).join(', ')}\n` +
			`Received variables: ${receivedEntries.join(', ')}\n` +
			`Missing variables: ${undefinedEntries.join(', ')}\n`);
	}

	return envDictionary as ImportMetaEnv;
}

export {checkEnvVariables};