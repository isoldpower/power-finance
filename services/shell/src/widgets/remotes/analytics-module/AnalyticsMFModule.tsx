import type { FC } from "react";
import { lazy, useState } from "react";

import { AttachToShadowDom, RemoteLoadingFx, TransferColorSchemeToShadowDom } from "@feature/remotes";


const AnalyticsRemoteApp = lazy(() => import('analytics/remote-app'));

const AnalyticsMFModule: FC = () => {
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

export { AnalyticsMFModule };
