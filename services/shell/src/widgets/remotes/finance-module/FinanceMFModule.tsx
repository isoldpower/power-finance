import type { FC } from "react";
import { lazy } from "react";

import { RemoteLoadingFx } from "@feature/remotes";


type FinanceMFModuleProps = object & {};

const FinanceRemoteApp = lazy(() => import('finance/remote-app'));

const FinanceMFModule: FC<FinanceMFModuleProps> = () => {
	return (
		<RemoteLoadingFx>
			<FinanceRemoteApp />
		</RemoteLoadingFx>
	)
}

FinanceMFModule.displayName = 'FinanceMFModule';

export { FinanceMFModule };
export type { FinanceMFModuleProps };
