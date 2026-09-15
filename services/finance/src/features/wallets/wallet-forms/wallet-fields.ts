import { ZERO_AMOUNT } from "@shared/api";
import { WALLET_COLOR_PATTERN } from "@entity/wallets";

import { z } from "zod";

import type { WalletDraft, WalletPatch } from "@entity/wallets";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const walletFieldsShape = {
	name: z.string().min(1, "Please enter a name"),
	category: z.string(),
	currency: z.string().min(1, "Please select a currency"),
	balance: z.string(),
	color: z.string().regex(WALLET_COLOR_PATTERN, "Please pick a colour"),
};

const buildWalletDraft = (
	values: WalletFormSchema,
	openingBalance: string
): WalletDraft => ({
	name: values.name.trim(),
	color: values.color,
	openingBalance,
	zeroBalance: ZERO_AMOUNT,
	currency: values.currency,
	category: values.category.trim(),
});

const buildWalletPatch = (values: WalletFormSchema): WalletPatch => ({
	name: values.name.trim(),
	category: values.category.trim(),
	color: values.color,
});

export { walletFieldsShape, buildWalletDraft, buildWalletPatch };
