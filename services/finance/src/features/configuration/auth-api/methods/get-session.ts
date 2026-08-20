import { sessionFromApi } from "../mutators";

import type { UserSession } from "@entity/configuration";
import type { IAuthRESTApiClient } from "../rest-client";


interface GetSessionRequest {
	handler: Pick<IAuthRESTApiClient, 'session'>;
	reload?: boolean;
}

type GetSessionResponse = UserSession;

async function getSession(request: GetSessionRequest): Promise<GetSessionResponse> {
	const response = await request.handler.session({
		...(request.reload === undefined
			? {}
			: { reload: request.reload }),
	});

	return sessionFromApi(response.data);
}

export { getSession };
export type { GetSessionRequest, GetSessionResponse };
