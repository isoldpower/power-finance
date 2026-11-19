import { STALE_READ_STATUS } from "../../api/index.ts";

import type { GuestDemoReadinessProbeDto, IGuestDemoReadinessRESTApiClient } from "./types.ts";


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
