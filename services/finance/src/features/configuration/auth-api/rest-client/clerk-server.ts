import { ApiError, isApiError } from "@shared/api";
import { mergePreferences, readPreferences } from "./metadata.ts";

import type { types } from "@internal/shared";
import type { UserDto } from "../types.ts";
import type {
	IAuthRESTApiClient,
	PreferencesPatchRequest,
	PreferencesPatchResponse,
	SessionRequest,
	SessionResponse,
} from "./types.ts";


type ClerkUserSource = () => types.UserResource | null;

const userToDto = (user: types.UserResource): UserDto => ({
	id: user.id,
	first_name: user.firstName,
	last_name: user.lastName,
	full_name: user.fullName,
	email: user.primaryEmailAddress?.emailAddress ?? null,
	image_url: user.imageUrl,
	created_at: user.createdAt?.toISOString() ?? null,
	updated_at: user.updatedAt?.toISOString() ?? null,
	preferences: readPreferences(user.unsafeMetadata),
});

const asApiError = (error: unknown): ApiError => {
	if (isApiError(error)) {
		return error;
	}

	return new ApiError(
		'internal_error',
		error instanceof Error ? error.message : 'Clerk rejected the request',
	);
};

class AuthClerkRESTApiClient implements IAuthRESTApiClient {
	private readonly getUser: ClerkUserSource;

	constructor(getUser: ClerkUserSource) {
		this.getUser = getUser;
	}

	public async session(request: SessionRequest): Promise<SessionResponse> {
		const userResponse = this.getUser();

		if (!userResponse) {
			return {
				data: { authenticated: false, user: null },
				meta: {},
			};
		}

		try {
			const current = request.reload 
				? await userResponse.reload()
				: userResponse;

			return {
				data: { authenticated: true, user: userToDto(current) },
				meta: {},
			};
		} catch (error) {
			throw asApiError(error);
		}
	}

	public async patchPreferences(request: PreferencesPatchRequest): Promise<PreferencesPatchResponse> {
		const user = this.getUser();
		if (!user) {
			throw new ApiError(
				'unauthorized',
				'Preferences belong to a signed in user',
			);
		}

		try {
			const updated = await user.update({
				unsafeMetadata: mergePreferences(user.unsafeMetadata, request.data),
			});

			return {
				data: userToDto(updated),
				meta: {},
			};
		} catch (error) {
			throw asApiError(error);
		}
	}
}

export { AuthClerkRESTApiClient };
export type { ClerkUserSource };
