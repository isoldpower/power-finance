import { guestDemoSessionFromApi } from "../mutators";

import type { GuestDemoSession } from "@entity/accounts";
import type { IGuestDemoSessionsRESTApiClient } from "../rest-client";


interface StartGuestDemoSessionRequest {
	handler: Pick<IGuestDemoSessionsRESTApiClient, 'post'>;
}

async function startGuestDemoSession(request: StartGuestDemoSessionRequest): Promise<GuestDemoSession> {
	const response = await request.handler.post();

	return guestDemoSessionFromApi(response.body.data, response.writeVersion);
}

export { startGuestDemoSession };
export type { StartGuestDemoSessionRequest };
