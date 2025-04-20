import { createFileRoute } from '@tanstack/react-router'

import { SignupPage } from "@page/auth";
import {getTanStackPageFx} from "@shared/components";

export const Route = createFileRoute('/auth/_layout/signup')({
  component: SignupPage,
	...getTanStackPageFx('default-page')
})
