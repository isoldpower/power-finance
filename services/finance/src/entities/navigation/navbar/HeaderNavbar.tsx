import { cn } from "@internal/ui-library";
import { getIsEmbedded } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type HeaderNavbarProps = PropsWithChildren;

const HeaderNavbar: FC<HeaderNavbarProps> = ({ children }) => {
	const isEmbedded = getIsEmbedded();

	return (
		<header
			className={cn(
				"sticky top-0 z-30 flex items-center gap-4 border-b border-border",
				"bg-[color-mix(in_srgb,var(--surface)_82%,transparent)]",
				"py-2.5 pr-[22px] backdrop-blur-[14px]",
				isEmbedded ? "pl-16" : "pl-[22px]"
			)}
		>
			{children}
		</header>
	);
};

HeaderNavbar.displayName = 'HeaderNavbar';

export { HeaderNavbar };
export type { HeaderNavbarProps };
