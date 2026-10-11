import { createFileRoute } from '@tanstack/react-router'
import {AppLoader} from "@internal/ui-library";
import {LandingPage} from "@page/landing-page";

export const Route = createFileRoute('/landing')({
	staticData: { title: 'Home' },
	pendingComponent: () => <AppLoader />,
  	component: () => <LandingPage />,
})