import { createFileRoute } from '@tanstack/react-router'

import { RecoveryPage } from "@page/auth";
import {getTanStackPageFx} from "@shared/components";

export const Route = createFileRoute('/auth/_layout/recovery')({
  component: RecoveryPage,
	...getTanStackPageFx('default-page')
})
