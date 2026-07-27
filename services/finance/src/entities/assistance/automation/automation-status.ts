type AutomationStatusTone = 'pos' | 'warn';

interface AutomationStatus {
	text: string;
	tone: AutomationStatusTone;
}

const automationStatus = (enabled: boolean): AutomationStatus => {
	return enabled
		? { text: 'active', tone: 'pos' }
		: { text: 'paused', tone: 'warn' };
};

export { automationStatus };
export type { AutomationStatus, AutomationStatusTone };
