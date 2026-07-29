import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";
import { getIsEmbedded } from "@internal/shared";


interface HeaderNavbarProps {
	children: ReactNode;
}

const HeaderNavbar: FC<HeaderNavbarProps> = ({ children }) => {
	const isEmbedded = getIsEmbedded();
	
	return (
		<header
			className={cn(
				"sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] py-2.5 pr-[22px] backdrop-blur-[14px]",
				isEmbedded ? "pl-16" : "pl-[22px]"
			)}
		>
			{children}
		</header>
	);
}

export { HeaderNavbar };