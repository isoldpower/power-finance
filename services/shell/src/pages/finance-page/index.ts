import {FinancePage} from './FinancePage.tsx';

const FinancePageLazy = () => import('./FinancePage.tsx');

export { FinancePageLazy, FinancePage };
