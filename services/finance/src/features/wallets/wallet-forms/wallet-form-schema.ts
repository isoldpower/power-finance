import { z } from "zod";
import { walletFieldsShape } from "./wallet-fields.ts";


const walletFormSchema = z.object(walletFieldsShape);

type WalletFormSchema = z.infer<typeof walletFormSchema>;


export { walletFormSchema };
export type { WalletFormSchema };
