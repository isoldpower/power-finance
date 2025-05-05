import { lazy } from "react";

export const TransactionsPageLazy = lazy(() => import('./TransactionsPage.tsx'));
export { TransactionsPage } from './TransactionsPage.tsx';
export { searchSchema } from './searchSchema.ts';
