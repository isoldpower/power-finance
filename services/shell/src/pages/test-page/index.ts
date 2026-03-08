import { TestPage } from './TestPage.tsx';

const TestPageLazy = () => import('./TestPage.tsx')
	.then((module) => module.TestPage);

export { TestPage, TestPageLazy };