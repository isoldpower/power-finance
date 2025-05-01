import { z } from "zod";
import {WALLET_TYPES} from "@entity/wallet";

const walletSchema = z.object({
	name: z.string().min(1, "Please enter a name"),
	balance: z.coerce.number().min(0, "Please enter a valid balance"),
	currency: z.string().min(1, "Please select a currency"),
	type: z.enum([WALLET_TYPES[0], ...WALLET_TYPES.slice(1)])
});

type WalletSchema = z.infer<typeof walletSchema>;

export { walletSchema };
export type { WalletSchema };