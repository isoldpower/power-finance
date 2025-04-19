import { createContext } from 'react';

import type { SettingsContextValue } from '../types.ts';

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsConsumer = SettingsContext.Consumer;
