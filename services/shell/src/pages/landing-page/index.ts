import {LandingPage} from './LandingPage.tsx';

const LandingPageLazy = () => import('./LandingPage.tsx')
	.then((module) => module.LandingPage);

export {LandingPageLazy, LandingPage};
