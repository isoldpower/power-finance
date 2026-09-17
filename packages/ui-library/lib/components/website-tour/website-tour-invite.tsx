import { useCallback } from "react";

import { cn } from "@/utils";
import {
	UiDialog,
	UiDialogContent,
	UiDialogDescription,
	UiDialogHeader,
	UiDialogTitle,
	UiButton
} from "@/entities/root";
import { useWebsiteTourContext } from "./context/context.ts";

import type { FC, ReactNode } from "react";


interface WebsiteTourInviteProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	contentClassName?: string;
	title?: ReactNode;
	description?: ReactNode;
	illustration?: ReactNode;
	startLabel?: string;
	skipLabel?: string;
}

const WebsiteTourInvite: FC<WebsiteTourInviteProps> = ({
	open,
	onOpenChange,
	contentClassName,
	title = 'Welcome to the tour',
	description = 'Take a quick tour to learn about the key features and functionality of this application.',
	illustration,
	startLabel = 'Start tour',
	skipLabel = 'Skip tour'
}) => {
	const { startTour, skipTour, totalSteps, completed, isActive } = useWebsiteTourContext();

	const handleStart = useCallback(() => {
		onOpenChange(false);
		startTour();
	}, [onOpenChange, startTour]);

	const handleSkip = useCallback(() => {
		onOpenChange(false);
		skipTour();
	}, [onOpenChange, skipTour]);

	if (completed || isActive || totalSteps === 0) {
		return null;
	}

	return (
		<UiDialog open={open} onOpenChange={onOpenChange}>
			<UiDialogContent className={cn("max-w-md p-6", contentClassName)}>
				<UiDialogHeader className="flex flex-col items-center justify-center">
					{illustration}
					<UiDialogTitle className="text-center text-xl font-medium">
						{title}
					</UiDialogTitle>
					<UiDialogDescription className="mt-2 text-center text-sm text-muted-foreground">
						{description}
					</UiDialogDescription>
				</UiDialogHeader>
				<div className="mt-6 space-y-3">
					<UiButton className="w-full" onClick={handleStart}>
						{startLabel}
					</UiButton>
					<UiButton className="w-full" variant="ghost" onClick={handleSkip}>
						{skipLabel}
					</UiButton>
				</div>
			</UiDialogContent>
		</UiDialog>
	);
};

WebsiteTourInvite.displayName = 'WebsiteTourInvite';

export { WebsiteTourInvite };
export type { WebsiteTourInviteProps };
