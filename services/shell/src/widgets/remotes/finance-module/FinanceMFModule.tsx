import type { FC } from "react";
import { lazy, useState } from "react";

import { AttachToShadowDom, RemoteLoadingFx, TransferColorSchemeToShadowDom } from "@feature/remotes";
import { RemoteLoadingScreen } from "@entity/remotes";


type FinanceMFModuleProps = object & {};

const FinanceRemoteApp = lazy(() => import('finance/remote-app'));

const FinanceMFModule: FC<FinanceMFModuleProps> = () => {
	const [shadowMountPoint, setShadowMountPoint] = useState<HTMLDivElement | null>(null);
	
	return (
		<AttachToShadowDom id="finance" onMountPointChange={setShadowMountPoint}>
			{shadowMountPoint && (
				<TransferColorSchemeToShadowDom mountPoint={shadowMountPoint}>
					<RemoteLoadingFx suspenseFallback={<RemoteLoadingScreen title="Finance" />}>
						<FinanceRemoteApp />
					</RemoteLoadingFx>
				</TransferColorSchemeToShadowDom>
			)}
		</AttachToShadowDom>
	)
}

FinanceMFModule.displayName = 'FinanceMFModule';
export default FinanceMFModule;

export { FinanceMFModule };
export type { FinanceMFModuleProps };
