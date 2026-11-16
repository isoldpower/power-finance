import { parseAmount } from "@internal/shared";

import type { MoneyLike } from "./types.ts";


const amountValue = (money: MoneyLike): number => parseAmount(money.amount);

export { amountValue };
