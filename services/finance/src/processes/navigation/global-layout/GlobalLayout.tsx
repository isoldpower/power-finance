import type { FC, ReactNode } from "react";

import { FinanceNavbar } from "../navbar/FinanceNavbar.tsx";
import { FinanceBackground } from "@widget/navigation/background/FinanceBackground.tsx";


interface GlobalLayoutProps {
	children: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
	return (
		<div className="finance-theme relative flex min-h-screen flex-col bg-background text-foreground">
			<FinanceBackground />
			<div className="relative z-[1] flex min-h-screen flex-col">
				<FinanceNavbar />
				<main className="flex-1">
					{children}
				</main>
			</div>
		</div>
	)
}

export { GlobalLayout };
