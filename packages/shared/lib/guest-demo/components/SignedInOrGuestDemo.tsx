import { AuthGuard } from "../../auth/index.ts";
import { DemoSessionScreen } from "../../demo-session/components/index.ts";
import { useGuestDemoPreparation } from "../preparation/index.ts";
import { useGuestDemoContext } from "../session/index.ts";
import { PREPARATION_FAILED_DESCRIPTION, PREPARATION_FAILED_HEADING } from "./config.ts";
import { DemoPreparationScreen } from "./preparation-screen/index.ts";

import type { FC, ReactNode } from "react";


interface SignedInOrGuestDemoProps {
	pending: ReactNode;
	renderRetry: (retry: () => void) => ReactNode;
	children: ReactNode;
}

type GuestDemoPreparationGateProps = SignedInOrGuestDemoProps;

const GuestDemoPreparationGate: FC<GuestDemoPreparationGateProps> = ({ pending, renderRetry, children }) => {
	const { preparing, failed, retry } = useGuestDemoPreparation();

	if (failed) {
		return (
			<DemoSessionScreen
				heading={PREPARATION_FAILED_HEADING}
				description={PREPARATION_FAILED_DESCRIPTION}
				actions={(
					<DemoPreparationScreen.Actions>
						{renderRetry(retry)}
					</DemoPreparationScreen.Actions>
				)}
			/>
		);
	}

	return preparing ? pending : children;
};

const SignedInOrGuestDemo: FC<SignedInOrGuestDemoProps> = ({ pending, renderRetry, children }) => {
	const { isGuestVisit } = useGuestDemoContext();

	if (isGuestVisit) {
		return (
			<GuestDemoPreparationGate pending={pending} renderRetry={renderRetry}>
				{children}
			</GuestDemoPreparationGate>
		);
	}

	return (
		<AuthGuard>
			{children}
		</AuthGuard>
	);
};

GuestDemoPreparationGate.displayName = 'GuestDemoPreparationGate';
SignedInOrGuestDemo.displayName = 'SignedInOrGuestDemo';

export { SignedInOrGuestDemo };
export type { SignedInOrGuestDemoProps };
