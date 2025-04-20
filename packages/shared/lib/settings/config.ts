import type { SettingsState } from './types.js';

export const STORAGE_KEY = 'app-settings';

export const defaultSettings: SettingsState = {
  theme: 'light',
	sidebarOpen: true,
	mobileSidebarOpen: false
} as const;
