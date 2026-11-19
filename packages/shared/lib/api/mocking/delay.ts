import { MOCK_LATENCY } from "./config.ts";


const delay = (duration: number = MOCK_LATENCY): Promise<void> => {
	return new Promise((resolve) => { setTimeout(resolve, duration); });
};

export { delay, MOCK_LATENCY };
