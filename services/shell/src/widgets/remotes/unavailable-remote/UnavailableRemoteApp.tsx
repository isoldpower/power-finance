import type { FC } from "react";


const UnavailableRemoteApp: FC = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-2 min-h-[50vh] text-center">
			<h2 className="text-xl font-semibold">Coming soon</h2>
			<p className="opacity-70">This section is not available yet.</p>
		</div>
	)
}

UnavailableRemoteApp.displayName = 'UnavailableRemoteApp';
export default UnavailableRemoteApp;

export { UnavailableRemoteApp };
