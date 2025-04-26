import type {FC, ReactNode} from "react";
import {HEADER_HEIGHT} from "./config.ts";

interface HeaderBoxProps {
	children: ReactNode;
}

const HeaderBox: FC<HeaderBoxProps> = ({ children }) => {
	return (
		<header
			className="sticky top-0 left-0 right-0 w-full flex py-2 pr-6 pl-16 z-2 border-b bg-sidebar"
			style={{ height: HEADER_HEIGHT }}
		>
			{children}
		</header>
	)
}

HeaderBox.displayName = 'HeaderBox';

export { HeaderBox };
export type { HeaderBoxProps };