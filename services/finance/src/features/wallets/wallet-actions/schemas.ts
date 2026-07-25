import { z } from "zod";

const walletEntrySchema = z.object({
	name: z.string().min(1, "Please enter a name"),
	type: z.string(),
	currency: z.string().min(1, "Please select a currency"),
	balance: z.string(),
});

type WalletEntrySchema = z.infer<typeof walletEntrySchema>;

export { walletEntrySchema };
export type { WalletEntrySchema };
