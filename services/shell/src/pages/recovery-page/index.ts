import {RecoveryPage} from './RecoveryPage.tsx';

const RecoveryPageLazy = () => import('./RecoveryPage.tsx')
	.then((module) => module.RecoveryPage);

export {RecoveryPageLazy, RecoveryPage};
