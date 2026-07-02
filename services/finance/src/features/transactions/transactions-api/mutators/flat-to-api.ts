import type { TransactionMinimalPayload } from "../types.ts";
import type { TransactionDto } from "@entity/transactions";


const transactionDtoToPayload = (
	dto: Pick<TransactionDto, 'source_wallet' | 'amount'>
): TransactionMinimalPayload => {
	return {
		source_wallet_id: dto.source_wallet.id,
		amount: dto.amount,
	};
}

export { transactionDtoToPayload };
