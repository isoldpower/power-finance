import type { FC } from "react";
import { lazy, useState } from "react";

import { AttachToShadowDom, RemoteLoadingFx, TransferColorSchemeToShadowDom } from "@feature/remotes";


type AnalyticsMFModuleProps = object & {};

const AnalyticsRemoteApp = lazy(() => import('analytics/remote-app'));

const AnalyticsMFModule: FC<AnalyticsMFModuleProps> = () => {
	const [shadowMountPoint, setShadowMountPoint] = useState<HTMLDivElement | null>(null);

	return (
		<AttachToShadowDom id="analytics" onMountPointChange={setShadowMountPoint}>
			{shadowMountPoint && (
				<TransferColorSchemeToShadowDom mountPoint={shadowMountPoint}>
					<RemoteLoadingFx>
						<AnalyticsRemoteApp />
					</RemoteLoadingFx>
				</TransferColorSchemeToShadowDom>
			)}
		</AttachToShadowDom>
	)
}

AnalyticsMFModule.displayName = 'AnalyticsMFModule';
export default AnalyticsMFModule;

export { AnalyticsMFModule };
export type { AnalyticsMFModuleProps };
