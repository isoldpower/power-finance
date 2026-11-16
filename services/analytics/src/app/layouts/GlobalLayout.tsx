import { FinanceBackground, GuestDemoModeBar, ShowOnStandalone } from "@internal/shared";
import { FinanceButton } from "@internal/ui-library";
import { AnalyticsFiltersProvider } from "@feature/filters";
import { RouteLink } from "@feature/shell";
import { DrillDownPanelWithFx } from "@process/transactions";
import { AccountMenu } from "@process/shell";
import { AnalyticsTabs } from "@widget/shell";
import { BrandMark, HeaderNavbar } from "@entity/shell";

import type { FC, ReactNode } from "react";


interface GlobalLayoutProps {
	children: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => (
	<AnalyticsFiltersProvider>
		<div className="finance-theme relative flex min-h-screen flex-col bg-background text-foreground">
			<FinanceBackground />
			<div className="relative z-[1] flex min-h-screen flex-col">
				<HeaderNavbar>
					<div className="flex w-full items-center justify-between gap-4">
						<div className="flex items-center gap-4">
							<ShowOnStandalone>
								<RouteLink to="overview">
									<BrandMark label="Analytics" />
								</RouteLink>
							</ShowOnStandalone>
							<AnalyticsTabs />
						</div>
						<AccountMenu />
					</div>
				</HeaderNavbar>
				<GuestDemoModeBar
					renderReload={(reload) => (
						<FinanceButton type="button" size="sm" variant="outline" onClick={reload}>
							Reload
						</FinanceButton>
					)}
				/>
				<main className="flex-1">
					{children}
				</main>
			</div>
			<DrillDownPanelWithFx />
		</div>
	</AnalyticsFiltersProvider>
);

GlobalLayout.displayName = 'GlobalLayout';

export { GlobalLayout };
