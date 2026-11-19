import { cn } from "../../../utils/index.ts";
import { DemoPreparationActions } from "./parts/DemoPreparationActions.tsx";
import { DemoPreparationDescription } from "./parts/DemoPreparationDescription.tsx";
import { DemoPreparationHeading } from "./parts/DemoPreparationHeading.tsx";
import { DemoPreparationNotice } from "./parts/DemoPreparationNotice.tsx";
import { DemoPreparationStatus } from "./parts/DemoPreparationStatus.tsx";

import type { FC, PropsWithChildren } from "react";
import type { DemoPreparationActionsProps } from "./parts/DemoPreparationActions.tsx";
import type { DemoPreparationDescriptionProps } from "./parts/DemoPreparationDescription.tsx";
import type { DemoPreparationHeadingProps } from "./parts/DemoPreparationHeading.tsx";
import type { DemoPreparationNoticeProps } from "./parts/DemoPreparationNotice.tsx";
import type { DemoPreparationStatusProps } from "./parts/DemoPreparationStatus.tsx";


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
		<div
			className={cn(
				"fx-rise flex w-full max-w-[420px] flex-col gap-5 p-6",
				"rounded-[var(--radius-lg)] border border-border bg-card text-card-foreground shadow-[var(--shadow-lg)]",
			)}
		>
			{children}
		</div>
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
