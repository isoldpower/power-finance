import type {FC, ReactNode} from "react";
import {HEADER_HEIGHT} from "./config.ts";

interface HeaderBoxOffsetProps {
	children: ReactNode;
}

const HeaderBoxOffset: FC<HeaderBoxOffsetProps> = ({ children }) => {
	return (
		<div style={{
			marginTop: `${HEADER_HEIGHT}px`,
		}}>
			{children}
		</div>
	)
}

HeaderBoxOffset.displayName = 'HeaderBoxOffset';

export { HeaderBoxOffset };
export type { HeaderBoxOffsetProps };