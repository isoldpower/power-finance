import { useCallback, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { useTransaction } from "../../data-presenters";
import { NO_ADJUSTED_TRANSACTION } from "../config.ts";

import type { UseFormReturn } from "react-hook-form";
import type { Transaction } from "@entity/transactions";
import type { AddTransactionSchema } from "./add-transaction-schema.ts";


interface UseEntryAdjustmentReturn {
	adjusted: Transaction | undefined;
	adjusting: boolean;
	pick: (transaction: Transaction | null) => void;
}

const useEntryAdjustment = (form: UseFormReturn<AddTransactionSchema>): UseEntryAdjustmentReturn => {
	const [picked, setPicked] = useState<Transaction | null>(null);
	const adjustsId = useWatch({ control: form.control, name: 'adjusts' });
	const adjusting = adjustsId !== NO_ADJUSTED_TRANSACTION;
	const { transaction: fetched } = useTransaction(adjustsId, { enabled: adjusting });

	const adjusted = useMemo(() => {
		if (!adjusting) {
			return undefined;
		}

		return fetched ?? (picked?.id === adjustsId ? picked : undefined);
	}, [adjusting, adjustsId, fetched, picked]);

	const pick = useCallback((transaction: Transaction | null) => {
		setPicked(transaction);
		form.setValue('adjusts', transaction?.id ?? NO_ADJUSTED_TRANSACTION, { shouldDirty: true, shouldValidate: true });

		if (!transaction) {
			return;
		}

		if (form.getValues('type') === 'transfer') {
			form.setValue('type', transaction.type, { shouldDirty: true, shouldValidate: true });
		}
		if (transaction.category) {
			form.setValue('category', transaction.category, { shouldDirty: true, shouldValidate: true });
		}
	}, [form]);

	return useMemo(() => ({ adjusted, adjusting, pick }), [adjusted, adjusting, pick]);
};

export { useEntryAdjustment };
export type { UseEntryAdjustmentReturn };
