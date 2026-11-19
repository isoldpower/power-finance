import { createContext } from "react";

import type { GuestDemoContextValue } from "./types.ts";


const GuestDemoReactContext = createContext<GuestDemoContextValue | null>(null);

export { GuestDemoReactContext };
