import { useIsDesktop } from "@shared/utils";
import type { FC, PropsWithChildren } from "react";


const ShowOnMobile: FC<PropsWithChildren> = ({ children }) => {
	const isDesktop = useIsDesktop();
	
	return !isDesktop ? children : null;
}

export { ShowOnMobile };