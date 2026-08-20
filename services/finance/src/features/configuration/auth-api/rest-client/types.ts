import type { MutationResponse, ResourceResponse } from "@shared/api";
import type { PreferencesPatchBody, SessionDto, UserDto } from "../types.ts";


interface SessionRequest {
	reload?: boolean;
}

type SessionResponse = ResourceResponse<SessionDto>;

interface PreferencesPatchRequest {
	data: PreferencesPatchBody;
}

type PreferencesPatchResponse = MutationResponse<UserDto>;

interface IAuthRESTApiClient {
	session: (request: SessionRequest) => Promise<SessionResponse>;
	patchPreferences: (request: PreferencesPatchRequest) => Promise<PreferencesPatchResponse>;
}

export type {
	IAuthRESTApiClient,
	PreferencesPatchRequest,
	PreferencesPatchResponse,
	SessionRequest,
	SessionResponse,
};
