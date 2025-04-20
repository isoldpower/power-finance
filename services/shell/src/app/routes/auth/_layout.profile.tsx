import { createFileRoute } from '@tanstack/react-router'

import { UserProfilePage } from "@page/auth";
import {getTanStackPageFx} from "@shared/components";

export const Route = createFileRoute('/auth/_layout/profile')({
	component: UserProfilePage,
	...getTanStackPageFx('default-page')
})
