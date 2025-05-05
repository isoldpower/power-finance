import {lazy} from "react";

export const DashboardPageLazy = lazy(() => import('./DashboardPage.tsx'));

export { DashboardPage } from './DashboardPage.tsx';
export { searchSchema } from './searchSchema.ts';
