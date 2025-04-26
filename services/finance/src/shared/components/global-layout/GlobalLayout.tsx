import type { FC, ReactNode } from "react";

import { HeaderBox } from "@shared/components";

interface GlobalLayoutProps {
	children: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col">
			<HeaderBox>
				hello
			</HeaderBox>
			<main>
				{children}
			</main>
		</div>
	)
}

export { GlobalLayout };