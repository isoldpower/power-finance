import { createFileRoute } from '@tanstack/react-router'

import {getTanStackPageFx} from "@shared/components";
import {UserProfilePage} from "@page/profile-page";

export const Route = createFileRoute('/auth/profile')({
	component: UserProfilePage,
	...getTanStackPageFx('default-page')
})
