import { getIsEmbedded } from "@internal/shared";
import type { FC, PropsWithChildren } from "react";


const ShowOnStandalone: FC<PropsWithChildren> = ({ children }) => {
	return getIsEmbedded() ? null : children;
}

ShowOnStandalone.displayName = 'ShowOnStandalone';

export { ShowOnStandalone };
