import {AnalyticsPage} from './AnalyticsPage.tsx';

const AnalyticsPageLazy = () => import('./AnalyticsPage.tsx')
	.then((module) => module.AnalyticsPage);

export {AnalyticsPageLazy, AnalyticsPage};
