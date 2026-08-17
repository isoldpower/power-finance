import { ApiError } from "../envelope";
import { stringifySorted } from "@shared/data";

interface IdempotentRecord<TResult> {
	bodyHash: string;
	result: TResult;
}

class IdempotencyStore<TResult> {
	private readonly records = new Map<string, IdempotentRecord<TResult>>();

	public replay(key: string | undefined, body: object): TResult | undefined {
		if (!key) return undefined;

		const record = this.records.get(key);
		if (!record) return undefined;

		if (record.bodyHash !== stringifySorted(body)) {
			throw new ApiError('idempotency_key_reuse', 'Idempotency key was reused with a different body');
		}

		return record.result;
	}

	public remember(key: string | undefined, body: object, result: TResult): void {
		if (!key) return;

		this.records.set(key, { bodyHash: stringifySorted(body), result });
	}

	public require(key: string | undefined): void {
		if (!key) {
			throw new ApiError('idempotency_key_required', 'Idempotency-Key header is required for this request');
		}
	}
}

export { IdempotencyStore };
export type { IdempotentRecord };
