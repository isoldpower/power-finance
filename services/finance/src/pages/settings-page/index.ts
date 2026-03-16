import { lazy } from "react";

export const SettingsPageLazy = lazy(() => import('./SettingsPage.tsx'));
export { SettingsPage } from './SettingsPage.tsx';
