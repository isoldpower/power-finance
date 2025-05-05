import {LoginPage} from './LoginPage.tsx';

const LoginPageLazy = () => import('./LoginPage.tsx')
	.then((module) => module.LoginPage);

export {LoginPageLazy, LoginPage};
