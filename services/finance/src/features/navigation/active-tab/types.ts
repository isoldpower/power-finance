type TabKey = 'dashboard' | 'management' | 'planning';

interface NavTab {
	key: TabKey;
	label: string;
}

export type { TabKey, NavTab };
