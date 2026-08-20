import type {
	UserIdentity,
	UserPreferences,
	UserProfile,
	UserSession,
} from "@entity/configuration";
import type { SessionDto, UserDto, UserPreferencesDto } from "../types.ts";


const identityFromApi = (dto: UserDto): UserIdentity => ({
	id: dto.id,
	firstName: dto.first_name,
	lastName: dto.last_name,
	fullName: dto.full_name,
	email: dto.email,
	imageUrl: dto.image_url,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
});

const preferencesFromApi = (dto: UserPreferencesDto): UserPreferences => ({
	locale: dto.locale,
	mainCurrency: dto.main_currency,
	timezone: dto.timezone,
});

const profileFromApi = (dto: UserDto): UserProfile => ({
	identity: identityFromApi(dto),
	preferences: preferencesFromApi(dto.preferences),
});

const sessionFromApi = (dto: SessionDto): UserSession => ({
	authenticated: dto.authenticated,
	profile: dto.user === null ? null : profileFromApi(dto.user),
});

export { identityFromApi, preferencesFromApi, profileFromApi, sessionFromApi };
