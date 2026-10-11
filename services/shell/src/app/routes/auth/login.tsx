import { createFileRoute } from '@tanstack/react-router'

import { getTanStackPageFx } from "@shared/components";
import { LoginPage } from "@page/login-page";

export const Route = createFileRoute('/auth/login')({
	staticData: {title: 'Sign in'},
	component: LoginPage,
	...getTanStackPageFx('default-page')
});
