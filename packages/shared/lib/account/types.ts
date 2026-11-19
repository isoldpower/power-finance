interface UserIdentity {
	id: string;
	firstName: string | null;
	lastName: string | null;
	fullName: string | null;
	email: string | null;
	imageUrl: string | null;
	createdAt: string | null;
	updatedAt: string | null;
}

interface UserPreferences {
	locale: string | null;
	mainCurrency: string | null;
	timezone: string | null;
}

interface UserPreferencesPatch {
	locale?: string;
	mainCurrency?: string;
	timezone?: string;
}

interface UserProfile {
	identity: UserIdentity;
	preferences: UserPreferences;
}

interface UserSession {
	authenticated: boolean;
	profile: UserProfile | null;
}

interface CurrencyMeta {
	code: string;
	symbol: string;
	name: string;
	decimals: number;
}

interface LocaleMeta {
	tag: string;
	name: string;
	region: string;
}

type LocalePickerVariant = 'field' | 'pill';

export type {
	CurrencyMeta,
	LocaleMeta,
	LocalePickerVariant,
	UserIdentity,
	UserPreferences,
	UserPreferencesPatch,
	UserProfile,
	UserSession,
};
