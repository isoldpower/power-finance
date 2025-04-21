import { createFileRoute } from '@tanstack/react-router'

import {getTanStackPageFx} from "@shared/components";
import {RecoveryPage} from "@page/recovery-page";

export const Route = createFileRoute('/auth/recovery')({
  component: RecoveryPage,
	...getTanStackPageFx('default-page')
})
