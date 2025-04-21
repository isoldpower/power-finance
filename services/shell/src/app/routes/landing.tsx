import { createFileRoute } from '@tanstack/react-router'
import {BrandAppLoader} from "@widget/settings";
import {LandingPage} from "@page/landing-page";

export const Route = createFileRoute('/landing')({
	pendingComponent: () => <BrandAppLoader />,
  component: () => <LandingPage />,
})