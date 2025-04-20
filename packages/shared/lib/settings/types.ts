type ThemeType = 'dark' | 'light';

interface SettingsState {
  theme: ThemeType
	sidebarOpen: boolean
	mobileSidebarOpen: boolean
}

interface SettingsContextValue extends SettingsState {
  onUpdate: (updateValue: Partial<SettingsState>) => void
  onUpdateField: <T extends keyof SettingsState>(field: T, value: SettingsState[T]) => void
}

export type { ThemeType, SettingsState, SettingsContextValue };
