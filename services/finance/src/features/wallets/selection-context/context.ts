import { createContext } from "react";

import type { StoreApi } from "zustand";
import type { WalletsSelectionState } from "./types.ts";


const WalletsSelectionReactContext = createContext<StoreApi<WalletsSelectionState> | null>(null);

export { WalletsSelectionReactContext };
