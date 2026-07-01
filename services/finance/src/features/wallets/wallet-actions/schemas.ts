import { z } from "zod";
import { WALLET_TYPES } from "@entity/wallet";

const walletSchema = z.object({
	name: z.string().min(1, "Please enter a name"),
	balance: z.coerce.number(),
	currency: z.string().min(1, "Please select a currency"),
	type: z.enum([WALLET_TYPES[0], ...WALLET_TYPES.slice(1)])
});

const deleteWalletSchema = z.object({
	id: z.string().min(1, "Couldn't identify wallet id"),
});

type WalletSchema = z.infer<typeof walletSchema>;
type DeleteWalletSchema = z.infer<typeof deleteWalletSchema>;

export { walletSchema, deleteWalletSchema };
export type { WalletSchema, DeleteWalletSchema };