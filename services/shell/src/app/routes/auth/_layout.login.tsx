import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from "@page/auth";
import { getTanStackPageFx } from "@shared/components";

export const Route = createFileRoute('/auth/_layout/login')({
  component: LoginPage,
	...getTanStackPageFx('default-page')
})
