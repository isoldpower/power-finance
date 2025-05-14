import { lazy } from 'react';

export { DashboardPage } from './DashboardPage.tsx';
export const DashboardPageLazy = lazy(() => import('./DashboardPage.tsx'));