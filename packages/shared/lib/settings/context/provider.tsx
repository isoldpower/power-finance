import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

import { defaultSettings, STORAGE_KEY } from '../config.js';
import { SettingsContext } from './context.js';

import type { SettingsContextValue, SettingsState } from '../index.ts';
import { useLocalStorage } from "../../local-storage";

const SettingsProvider: FC<{ readonly children: ReactNode }> = ({ children }) => {
  const values = useLocalStorage<SettingsState>(STORAGE_KEY, defaultSettings);

  const memoizedValue = useMemo<SettingsContextValue>(
    () => ({
      ...values.state,
      canReset: values.canReset,
      onReset: values.resetState,
      onUpdate: values.setState,
      onUpdateField: values.setField
    }),
    [
      values.state,
      values.setField,
      values.setState,
      values.canReset,
      values.resetState
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.displayName = 'SettingsProvider';

export { SettingsProvider };
