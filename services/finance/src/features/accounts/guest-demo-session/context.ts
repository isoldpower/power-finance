import { createContext } from "react";

import type { StoreApi } from "zustand";
import type { GuestDemoSessionState } from "./types.ts";


const GuestDemoSessionReactContext = createContext<StoreApi<GuestDemoSessionState> | null>(null);

export { GuestDemoSessionReactContext };
