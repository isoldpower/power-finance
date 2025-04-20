import { createFileRoute } from '@tanstack/react-router'
import {LandingPage} from "@page/core";
import {BrandAppLoader} from "@widget/core";

export const Route = createFileRoute('/landing')({
	pendingComponent: BrandAppLoader,
  component: LandingPage,
})
