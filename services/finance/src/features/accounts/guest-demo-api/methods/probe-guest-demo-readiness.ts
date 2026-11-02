import { STALE_READ_STATUS } from "@shared/api";

import type { GuestDemoReadinessProbeDto } from "../types.ts";
import type { IGuestDemoReadinessRESTApiClient } from "../rest-client";


interface ProbeGuestDemoReadinessRequest {
	handler: Pick<IGuestDemoReadinessRESTApiClient, 'probe'>;
	probe: GuestDemoReadinessProbeDto;
	writeVersion: string;
}

async function isGuestDemoReadModelBehind(request: ProbeGuestDemoReadinessRequest): Promise<boolean> {
	try {
		const response = await request.handler.probe({
			probe: request.probe,
			writeVersion: request.writeVersion,
		});

		return response.status === STALE_READ_STATUS;
	} catch {
		return false;
	}
}

export { isGuestDemoReadModelBehind };
export type { ProbeGuestDemoReadinessRequest };
