import {createContext} from "react";
import type {StoreApi} from "zustand";
import type {MetricsPreferencesState} from "./types.ts";

const MetricsPreferencesReactContext = createContext<StoreApi<MetricsPreferencesState> | null>(null);

export { MetricsPreferencesReactContext };