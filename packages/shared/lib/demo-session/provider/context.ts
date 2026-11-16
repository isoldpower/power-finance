import { createContext } from "react";

import type { DemoSessionContextValue } from "./types.ts";


const DemoSessionReactContext = createContext<DemoSessionContextValue>({ demoSession: undefined });

export { DemoSessionReactContext };
