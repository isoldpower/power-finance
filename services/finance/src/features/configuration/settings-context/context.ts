import { createContext } from "react";

import type { StoreApi } from "zustand";
import type { SettingsPreferencesState } from "./types.ts";


const SettingsPreferencesReactContext = createContext<StoreApi<SettingsPreferencesState> | null>(null);

export { SettingsPreferencesReactContext };
