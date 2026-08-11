import { z } from "zod";

import type { WalletKind } from "@entity/wallets";
import type { WalletValuableFields } from "../wallets-api";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const walletFieldsShape = {
	name: z.string().min(1, "Please enter a name"),
	type: z.string(),
	currency: z.string().min(1, "Please select a currency"),
	balance: z.string(),
};

const isCreditKind = (type: string, kinds: WalletKind[]): boolean => {
	return kinds.find((kind) => kind.label === type)?.credit ?? false;
};

const buildWalletPayload = (
	values: WalletFormSchema,
	gradient: string,
	balanceAmount: number,
	kinds: WalletKind[]
): WalletValuableFields => ({
	name: values.name.trim(),
	color: gradient,
	balance: { amount: balanceAmount, currency: values.currency },
	credit: isCreditKind(values.type, kinds),
});

export { walletFieldsShape, isCreditKind, buildWalletPayload };
