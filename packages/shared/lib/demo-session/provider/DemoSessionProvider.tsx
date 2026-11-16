import { useMemo } from "react";

import { useAxiosInstance } from "../../api/index.ts";
import { API_V1_PATH } from "../../guest-demo/api/config.ts";
import { DemoPreparationScreen } from "../../guest-demo/components/preparation-screen/index.ts";
import { DemoSessionsHttpRESTApiClient, DemoSessionsMockRESTApiClient } from "../api/index.ts";
import {
	DemoSessionScreen,
	FAILED_DESCRIPTION,
	FAILED_HEADING,
	ISSUING_DESCRIPTION,
	ISSUING_HEADING,
} from "../components/index.ts";
import { DEMO_SESSIONS_ISSUE_PATH } from "../config.ts";
import { isDemoSessionRequested } from "../demo-session-flag.ts";
import { DemoSessionReactContext } from "./context.ts";
import { useDemoSessionIssuance } from "./use-demo-session-issuance.ts";

import type { FC, ReactNode } from "react";
import type { GuestDemoApiMode } from "../../guest-demo/types.ts";
import type { DemoSessionContextValue } from "./types.ts";


interface DemoSessionProviderProps {
	baseUrl: string;
	mode: GuestDemoApiMode;
	sandbox?: string;
	renderRetry: (retry: () => void) => ReactNode;
	children: ReactNode;
}

const withoutToken = (): Promise<null> => Promise.resolve(null);

const DemoSessionProvider: FC<DemoSessionProviderProps> = ({ baseUrl, mode, sandbox, renderRetry, children }) => {
	const requested = useMemo(() => isDemoSessionRequested(), []);
	const issueAxios = useAxiosInstance({
		baseUrl: `${baseUrl}${API_V1_PATH}${DEMO_SESSIONS_ISSUE_PATH}`,
		getToken: withoutToken,
		sandbox,
	});
	const client = useMemo(() => {
		return mode === 'live'
			? new DemoSessionsHttpRESTApiClient(issueAxios)
			: new DemoSessionsMockRESTApiClient();
	}, [mode, issueAxios]);
	const { status, demoSession, retry } = useDemoSessionIssuance(requested, client);
	const contextValue = useMemo<DemoSessionContextValue>(() => ({ demoSession }), [demoSession]);

	if (status === 'issuing') {
		return <DemoSessionScreen heading={ISSUING_HEADING} description={ISSUING_DESCRIPTION} />;
	}

	if (status === 'failed') {
		return (
			<DemoSessionScreen
				heading={FAILED_HEADING}
				description={FAILED_DESCRIPTION}
				actions={(
					<DemoPreparationScreen.Actions>
						{renderRetry(retry)}
					</DemoPreparationScreen.Actions>
				)}
			/>
		);
	}

	return (
		<DemoSessionReactContext value={contextValue}>
			{children}
		</DemoSessionReactContext>
	);
};

DemoSessionProvider.displayName = 'DemoSessionProvider';

export { DemoSessionProvider };
export type { DemoSessionProviderProps };
