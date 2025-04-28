import {lazy} from "react";

export const WalletsPageLazy = lazy(() => import('./WalletsPage.tsx'));
export { WalletsPage } from './WalletsPage.tsx';
