import { createContext } from "react";

import type { StoreApi } from "zustand";
import type { AnalyticsFiltersState } from "../types.ts";


const AnalyticsFiltersContext = createContext<StoreApi<AnalyticsFiltersState> | null>(null);

export { AnalyticsFiltersContext };
