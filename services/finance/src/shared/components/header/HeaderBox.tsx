import type {FC, ReactNode} from "react";
import {HEADER_HEIGHT} from "./config.ts";

interface HeaderBoxProps {
	children: ReactNode;
}

const HeaderBox: FC<HeaderBoxProps> = ({ children }) => {
	return (
		<header style={{
			position: 'fixed',
			top: 0,
			height: `${HEADER_HEIGHT}px`,
			width: '100%',
			backgroundColor: '#f5f5f5',
			display: 'flex',
			padding: '8px 24px',
			zIndex: 1000,
		}}>
			{children}
		</header>
	)
}

HeaderBox.displayName = 'HeaderBox';

export { HeaderBox };
export type { HeaderBoxProps };