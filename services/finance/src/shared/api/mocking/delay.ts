const MOCK_LATENCY = 250;

const delay = (duration: number = MOCK_LATENCY): Promise<void> => {
	return new Promise((resolve) => { setTimeout(resolve, duration); });
};

export { delay, MOCK_LATENCY };
