import { use } from "react";

import { DemoSessionReactContext } from "./context.ts";


function useDemoSession(): string | undefined {
	return use(DemoSessionReactContext).demoSession;
}

export { useDemoSession };
