type ApiErrorCode =
	| 'bad_request'
	| 'validation_failed'
	| 'unauthorized'
	| 'forbidden'
	| 'not_found'
	| 'rate_limited'
	| 'internal_error'
	| 'idempotency_key_required'
	| 'idempotency_key_reuse'
	| 'idempotency_key_in_flight'
	| 'cursor_invalid'
	| 'cursor_mismatch'
	| 'chain_cycle'
	| 'chain_unknown_reference'
	| 'chain_too_long'
	| 'wallet_closed'
	| 'wallet_not_empty'
	| 'goal_not_empty'
	| 'already_deleted'
	| 'assistant_unavailable'
	| 'subscription_exists'
	| 'unknown_resolution'
	| 'action_already_resolved'
	| 'unsupported_currency'
	| 'rate_unavailable';

type ApiDetailCode =
	| 'required'
	| 'unknown_field'
	| 'amount_malformed'
	| 'amount_precision'
	| 'amount_out_of_range'
	| 'currency_mismatch'
	| 'not_a_reference'
	| 'out_of_bounds'
	| 'trigger_field_conflict'
	| 'effect_unknown_type'
	| 'effect_params_invalid'
	| 'effect_subject_mismatch'
	| 'unknown_event_type'
	| 'url_scheme'
	| 'filter_unknown_field'
	| 'filter_operator_not_allowed'
	| 'filter_value_type'
	| 'filter_malformed_group'
	| 'filter_malformed_node';

interface ApiErrorDetail {
	field: string;
	code: ApiDetailCode;
	message: string;
}

interface ApiErrorBody {
	code: ApiErrorCode;
	message: string;
	details?: ApiErrorDetail[];
}

interface ApiErrorMeta {
	request_id: string;
	timestamp: string;
}

interface ApiErrorEnvelope {
	error: ApiErrorBody;
	meta: ApiErrorMeta;
}

interface ApiErrorPayload {
	error: ApiErrorBody;
	meta?: Partial<ApiErrorMeta>;
}

const ERROR_STATUS: Record<ApiErrorCode, number> = {
	bad_request: 400,
	validation_failed: 422,
	unauthorized: 401,
	forbidden: 403,
	not_found: 404,
	rate_limited: 429,
	internal_error: 500,
	idempotency_key_required: 400,
	idempotency_key_reuse: 409,
	idempotency_key_in_flight: 409,
	cursor_invalid: 422,
	cursor_mismatch: 422,
	chain_cycle: 422,
	chain_unknown_reference: 422,
	chain_too_long: 422,
	wallet_closed: 409,
	wallet_not_empty: 409,
	goal_not_empty: 409,
	already_deleted: 404,
	assistant_unavailable: 503,
	subscription_exists: 409,
	unknown_resolution: 422,
	action_already_resolved: 409,
	unsupported_currency: 422,
	rate_unavailable: 409,
};

class ApiError extends Error {
	public readonly code: ApiErrorCode;
	public readonly status: number;
	public readonly details: ApiErrorDetail[];
	public readonly requestId: string | null;

	constructor(
		code: ApiErrorCode,
		message: string,
		details: ApiErrorDetail[] = [],
		requestId: string | null = null,
	) {
		super(message);
		this.name = 'ApiError';
		this.code = code;
		this.status = ERROR_STATUS[code];
		this.details = details;
		this.requestId = requestId;
	}
}

export { ApiError, ERROR_STATUS };
export type {
	ApiDetailCode,
	ApiErrorBody,
	ApiErrorCode,
	ApiErrorDetail,
	ApiErrorEnvelope,
	ApiErrorMeta,
	ApiErrorPayload
};
