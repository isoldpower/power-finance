type AutomationStatusTone = 'pos' | 'warn';

interface AutomationStatus {
	text: string;
	tone: AutomationStatusTone;
}

export type { AutomationStatus, AutomationStatusTone };