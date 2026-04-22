import type { TransactionSchema } from "../schemas.ts";
import type { TransactionMinimalPayload } from "@feature/transaction";


const buildCreateData = (data: TransactionSchema): TransactionMinimalPayload => {
	return {
		source_wallet_id: data.source_wallet_id,
		amount: data.amount.toFixed(2),
	};
};

export { buildCreateData };
