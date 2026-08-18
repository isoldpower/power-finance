import { useMemo } from "react";
import {
	FinanceButton,
	FinanceMenu,
	FinanceMenuContent,
	FinanceMenuTrigger,
} from "@internal/ui-library";
import { resolutionChoice } from "@entity/assistance";
import { ResolveActionOnClick } from "@feature/assistance";
import { ChevronDownIcon } from "@shared/pure-components/icons";
import { MENU_RESOLUTION_VARIANT, RESOLUTION_VARIANT } from "./config.ts";

import type { FC } from "react";
import type { ActionResolution } from "@entity/assistance";


interface ActionResolutionsProps {
	actionId: string;
	resolutions: ActionResolution[];
}

const ActionResolutions: FC<ActionResolutionsProps> = ({ actionId, resolutions }) => {
	const { recommended, alternatives } = useMemo(() => {
		return resolutionChoice(resolutions);
	}, [resolutions]);

	return recommended ? (
		<>
			<FinanceButton
				asChild
				variant={RESOLUTION_VARIANT[recommended.intent]}
				size="sm"
				className="w-28 flex-none justify-center"
			>
				<ResolveActionOnClick
					actionId={actionId}
					resolutionId={recommended.id}
					title={recommended.label}
				>
					<span className="truncate">{recommended.label}</span>
				</ResolveActionOnClick>
			</FinanceButton>
			{alternatives.length > 0 ? (
				<FinanceMenu>
					<FinanceMenuTrigger asChild>
						<FinanceButton
							variant="outline"
							size="sm"
							className="flex-none gap-1.5"
							aria-label="Other resolutions"
						>
							More
							<ChevronDownIcon />
						</FinanceButton>
					</FinanceMenuTrigger>
					<FinanceMenuContent className="min-w-44">
						{alternatives.map((resolution) => (
							<FinanceButton
								key={resolution.id}
								asChild
								variant={MENU_RESOLUTION_VARIANT[resolution.intent]}
								size="sm"
								className="w-full justify-start"
							>
								<ResolveActionOnClick actionId={actionId} resolutionId={resolution.id}>
									{resolution.label}
								</ResolveActionOnClick>
							</FinanceButton>
						))}
					</FinanceMenuContent>
				</FinanceMenu>
			) : null}
		</>
	) : null;
};

ActionResolutions.displayName = 'ActionResolutions';

export { ActionResolutions };
export type { ActionResolutionsProps };
