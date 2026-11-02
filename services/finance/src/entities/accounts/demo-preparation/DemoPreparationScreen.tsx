import { FinanceCard } from "@internal/ui-library";

import { DemoPreparationActions } from "./preparation/DemoPreparationActions.tsx";
import { DemoPreparationDescription } from "./preparation/DemoPreparationDescription.tsx";
import { DemoPreparationHeading } from "./preparation/DemoPreparationHeading.tsx";
import { DemoPreparationNotice } from "./preparation/DemoPreparationNotice.tsx";
import { DemoPreparationStatus } from "./preparation/DemoPreparationStatus.tsx";

import type { FC, PropsWithChildren } from "react";
import type { DemoPreparationActionsProps } from "./preparation/DemoPreparationActions.tsx";
import type { DemoPreparationDescriptionProps } from "./preparation/DemoPreparationDescription.tsx";
import type { DemoPreparationHeadingProps } from "./preparation/DemoPreparationHeading.tsx";
import type { DemoPreparationNoticeProps } from "./preparation/DemoPreparationNotice.tsx";
import type { DemoPreparationStatusProps } from "./preparation/DemoPreparationStatus.tsx";


type DemoPreparationScreenProps = PropsWithChildren;
type DemoPreparationScreenObject = FC<DemoPreparationScreenProps> & {
	Heading: FC<DemoPreparationHeadingProps>;
	Description: FC<DemoPreparationDescriptionProps>;
	Status: FC<DemoPreparationStatusProps>;
	Notice: FC<DemoPreparationNoticeProps>;
	Actions: FC<DemoPreparationActionsProps>;
};

const DemoPreparationScreen: DemoPreparationScreenObject = ({ children }) => (
	<div
		role="status"
		aria-live="polite"
		className="relative z-[1] flex min-h-screen items-center justify-center px-4 py-10"
	>
		<FinanceCard variant="elevated" className="fx-rise flex w-full max-w-[420px] flex-col gap-5 p-6">
			{children}
		</FinanceCard>
	</div>
);

DemoPreparationScreen.Heading = DemoPreparationHeading;
DemoPreparationScreen.Description = DemoPreparationDescription;
DemoPreparationScreen.Status = DemoPreparationStatus;
DemoPreparationScreen.Notice = DemoPreparationNotice;
DemoPreparationScreen.Actions = DemoPreparationActions;
DemoPreparationScreen.displayName = 'DemoPreparationScreen';

export { DemoPreparationScreen };
export type { DemoPreparationScreenProps };
