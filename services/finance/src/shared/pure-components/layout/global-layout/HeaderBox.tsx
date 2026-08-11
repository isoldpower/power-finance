import type {FC, ReactNode} from "react";
import {HEADER_HEIGHT} from "./config.ts";
import {getIsEmbedded} from "@internal/shared";
import {cn} from "@internal/ui-library";

interface HeaderBoxProps {
	children: ReactNode;
}

const HeaderBox: FC<HeaderBoxProps> = ({ children }) => {
	const isEmbedded = getIsEmbedded();

	return (
		<header
			className={cn(
				"sticky top-0 left-0 right-0 w-full justify-between flex py-2 pr-6 z-2 border-b bg-sidebar gap-10",
				isEmbedded ? "pl-16" : "pl-6"
			)}
			style={{ height: HEADER_HEIGHT }}
		>
			{children}
		</header>
	)
}

HeaderBox.displayName = 'HeaderBox';

export { HeaderBox };
export type { HeaderBoxProps };