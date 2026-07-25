import { lazy } from "react";

export const ManagementPageLazy = lazy(() => import('./ManagementPage.tsx'));

export { ManagementPage } from './ManagementPage.tsx';
export { searchSchema } from './search-schema.ts';
export type { ManagementSearch } from './search-schema.ts';
