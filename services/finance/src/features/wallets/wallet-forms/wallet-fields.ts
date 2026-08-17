import { z } from "zod";

import type { WalletDraft, WalletPatch } from "@entity/wallets";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const walletFieldsShape = {
	name: z.string().min(1, "Please enter a name"),
	category: z.string(),
	currency: z.string().min(1, "Please select a currency"),
	balance: z.string(),
};

const buildWalletDraft = (
	values: WalletFormSchema,
	gradient: string,
	openingBalance: number
): WalletDraft => ({
	name: values.name.trim(),
	color: gradient,
	openingBalance,
	zeroBalance: 0,
	currency: values.currency,
	category: values.category.trim(),
});

const buildWalletPatch = (values: WalletFormSchema): WalletPatch => ({
	name: values.name.trim(),
	category: values.category.trim(),
});

export { walletFieldsShape, buildWalletDraft, buildWalletPatch };
