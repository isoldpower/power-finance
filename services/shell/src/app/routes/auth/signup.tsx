import { createFileRoute } from '@tanstack/react-router'

import {getTanStackPageFx} from "@shared/components";
import {SignupPage} from "@page/signup-page";

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
	...getTanStackPageFx('default-page')
})
