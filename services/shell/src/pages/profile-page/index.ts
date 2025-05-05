import {UserProfilePage} from './ProfilePage.tsx';

const UserProfilePageLazy = () => import('./ProfilePage.tsx')
	.then((module) => module.UserProfilePage);

export {UserProfilePageLazy, UserProfilePage};
