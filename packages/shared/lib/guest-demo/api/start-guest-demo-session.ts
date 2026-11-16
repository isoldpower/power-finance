import { guestDemoSessionFromApi } from "./mappers.ts";

import type { GuestDemoSession } from "../types.ts";
import type { IGuestDemoSessionsRESTApiClient } from "./types.ts";


interface StartGuestDemoSessionRequest {
	handler: Pick<IGuestDemoSessionsRESTApiClient, 'post'>;
}

async function startGuestDemoSession(request: StartGuestDemoSessionRequest): Promise<GuestDemoSession> {
	const response = await request.handler.post();

	return guestDemoSessionFromApi(response.body.data, response.writeVersion);
}

export { startGuestDemoSession };
export type { StartGuestDemoSessionRequest };
