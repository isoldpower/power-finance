import { z } from "zod";

import type { WalletValuableFields } from "../wallets-api";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const CREDIT_TYPE = 'Credit card';

const walletFieldsShape = {
	name: z.string().min(1, "Please enter a name"),
	type: z.string(),
	currency: z.string().min(1, "Please select a currency"),
	balance: z.string(),
};

const isCreditType = (type: string): boolean => {
	return type === CREDIT_TYPE;
};

const buildWalletPayload = (
	values: WalletFormSchema,
	gradient: string,
	balanceAmount: number
): WalletValuableFields => ({
	name: values.name.trim(),
	color: gradient,
	balance: { amount: balanceAmount, currency: values.currency },
	credit: isCreditType(values.type),
});

export { CREDIT_TYPE, walletFieldsShape, isCreditType, buildWalletPayload };
