import { createContext } from "react";

import type { StoreApi } from "zustand";
import type { TransactionsSelectionState } from "./types.ts";


const TransactionsSelectionReactContext = createContext<StoreApi<TransactionsSelectionState> | null>(null);

export { TransactionsSelectionReactContext };
