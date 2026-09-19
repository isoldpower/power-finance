import { notify } from "@shared/overlays";

import { API_TOAST_DURATIONS } from "./config.ts";
import { describeApiError } from "./describe-error.ts";
import { describeApiOperation } from "./describe-operation.ts";

import type { ApiToastEvent } from "./types.ts";


const reportApiToast = ({
	id,
	key,
	phase,
	error
}: ApiToastEvent): void => {
	const messages = describeApiOperation(key);
	
	switch (phase) {
		case "requested":
			notify.pending(messages.pending, { id });
			
			return;
		case "succeeded":
			notify.success(messages.success, { 
				id,
				duration: API_TOAST_DURATIONS.success,
			});
			
			return;
		default:
			notify.error(messages.error, {
				id,
				description: describeApiError(error),
				duration: API_TOAST_DURATIONS.error,
			});
			
			return;
	}
};

export { reportApiToast };
