import { lazy } from "react";

export const ManagementPageLazy = lazy(() => import('./ManagementPage.tsx'));

export { ManagementPage } from './ManagementPage.tsx';
