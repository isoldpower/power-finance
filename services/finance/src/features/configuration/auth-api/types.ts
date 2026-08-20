interface UserPreferencesDto {
	locale: string | null;
	main_currency: string | null;
	timezone: string | null;
}

interface UserDto {
	id: string;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
	email: string | null;
	image_url: string | null;
	created_at: string | null;
	updated_at: string | null;
	preferences: UserPreferencesDto;
}

interface SessionDto {
	authenticated: boolean;
	user: UserDto | null;
}

interface PreferencesPatchBody {
	locale?: string;
	main_currency?: string;
	timezone?: string;
}

export type {
	PreferencesPatchBody,
	SessionDto,
	UserDto,
	UserPreferencesDto,
};
