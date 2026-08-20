import type { AutomationStatus } from "../automation";


const resolveAutomationStatus = (enabled: boolean): AutomationStatus => {
	return enabled
		? { text: 'active', tone: 'pos' }
		: { text: 'paused', tone: 'warn' };
};

export { resolveAutomationStatus };
