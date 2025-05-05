import {SignupPage} from './SignupPage.tsx';

const SignupPageLazy = () => import('./SignupPage.tsx')
	.then((module) => module.SignupPage);

export {SignupPageLazy, SignupPage};
