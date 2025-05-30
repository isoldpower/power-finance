import { Button, Icons } from "@internal/ui-library";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";

import { ServiceFeatureCard, LandingSectionShell } from "@shared/components";
import { cards } from "./static";
import { getAnalyticsRoute, getFinanceRoute } from "@internal/shared";


const LandingPage: FC = () => {
	return (
		<div className="flex flex-col items-stretch">
			<LandingSectionShell
				title={(
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
						Take Control of Your {' '}
						<span className="text-foreground">Financial Future</span>
					</h1>
				)}
				description="Track expenses, analyze spending patterns, and make informed financial decisions with our powerful analytics platform. Your money, simplified."
				badge="Smart Financial Management"
			>
				<div className="flex flex-col gap-2 min-[400px]:flex-row!">
					<Button size="lg" variant="secondary" asChild>
						<Link to={getFinanceRoute('dashboard')}>
							Start Free Trial
						</Link>
					</Button>
					<Button size="lg" disabled>
						Watch Demo
					</Button>
				</div>
				<div className="flex items-center space-x-4 text-sm text-gray-500">
					<div className="flex items-center space-x-1">
						<Icons.Shield className="h-4 w-4" />
						<span>Bank-level security</span>
					</div>
					<div className="flex items-center space-x-1">
						<Icons.Smartphone className="h-4 w-4" />
						<span>Mobile & web app</span>
					</div>
				</div>
			</LandingSectionShell>
			<LandingSectionShell
				badge="Features"
				title="Everything you need to manage your finances"
				description="From expense tracking to investment analysis, our comprehensive suite of tools helps you make smarter financial decisions."
			>
				<div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
					{cards.map((card) => (
						<ServiceFeatureCard
							key={card.id}
							title={card.title}
							description={card.description}
							Icon={card.Icon} 
						/>
					))}
				</div>
				<div className="flex justify-center">
					<Button size="lg" variant="default" asChild>
						<Link to={getAnalyticsRoute('dashboard')}>
							Get Started Today
						</Link>
					</Button>
				</div>
			</LandingSectionShell>
		</div>
	);
}

LandingPage.displayName = 'LandingPage';
export default LandingPage;

export { LandingPage };