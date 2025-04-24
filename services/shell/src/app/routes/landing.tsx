import { createFileRoute } from '@tanstack/react-router'
import {AppLoader} from "@widget/settings";
import {LandingPage} from "@page/landing-page";

export const Route = createFileRoute('/landing')({
	pendingComponent: () => <AppLoader />,
  component: () => <LandingPage />,
})