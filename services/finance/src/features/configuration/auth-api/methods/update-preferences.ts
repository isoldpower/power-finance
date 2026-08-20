import { preferencesPatchToApi, profileFromApi } from "../mutators";

import type { UserPreferencesPatch, UserProfile } from "@entity/configuration";
import type { IAuthRESTApiClient } from "../rest-client";


interface UpdatePreferencesRequest {
	handler: Pick<IAuthRESTApiClient, 'patchPreferences'>;
	patch: UserPreferencesPatch;
}

type UpdatePreferencesResponse = UserProfile;

async function updateUserPreferences(request: UpdatePreferencesRequest): Promise<UpdatePreferencesResponse> {
	const response = await request.handler.patchPreferences({
		data: preferencesPatchToApi(request.patch),
	});

	return profileFromApi(response.data);
}

export { updateUserPreferences };
export type { UpdatePreferencesRequest, UpdatePreferencesResponse };
