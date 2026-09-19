import { ApiError } from "@shared/api";


const describeApiError = (error: unknown): string | undefined => {
	if (error instanceof ApiError && error.details.length > 0) {
		return error.details
			.map((detail) => detail.message)
			.join(' · ');
	}

	return error instanceof Error 
		? error.message 
		: undefined;
};

export { describeApiError };
