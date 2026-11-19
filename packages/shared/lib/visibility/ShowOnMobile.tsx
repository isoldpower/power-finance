import { useIsDesktop } from "./use-media-query.ts";
import type { FC, PropsWithChildren } from "react";


const ShowOnMobile: FC<PropsWithChildren> = ({ children }) => {
	const isDesktop = useIsDesktop();
	
	return !isDesktop ? children : null;
}

export { ShowOnMobile };