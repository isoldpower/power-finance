import type { FC, ReactNode } from "react";

import { FinanceNavbar } from "./FinanceNavbar.tsx";


interface GlobalLayoutProps {
	children: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
	return (
		<div className="finance-theme flex min-h-screen flex-col bg-background text-foreground">
			<FinanceNavbar />
			<main className="flex-1">
				{children}
			</main>
		</div>
	)
}

export { GlobalLayout };
