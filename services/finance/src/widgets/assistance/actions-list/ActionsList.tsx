import { ActionsListFx } from "@feature/assistance";
import { ActionKindIcon, NeedsActionRow } from "@entity/assistance";
import { RowTitle } from "@shared/pure-components/typography";
import { ActionResolutions } from "./ActionResolutions.tsx";

import type { FC } from "react";
import type { Action } from "@entity/assistance";


interface ActionsListWidgetProps {
	actions: Action[];
	isPending: boolean;
	isError: boolean;
}

const ActionsList: FC<ActionsListWidgetProps> = ({
	actions,
	isError,
	isPending,
}) => {
	return (
		<ActionsListFx isPending={isPending} isError={isError} actions={actions}>
			{(loaded) => loaded.map((action) => (
				<NeedsActionRow key={action.id}>
					<NeedsActionRow.Icon severity={action.severity}>
						<ActionKindIcon kind={action.kind} />
					</NeedsActionRow.Icon>
					<div className="min-w-0 flex-1">
						<RowTitle>
							{action.title}
						</RowTitle>
						<NeedsActionRow.Subtitle>
							{action.body}
						</NeedsActionRow.Subtitle>
					</div>
					<ActionResolutions actionId={action.id} resolutions={action.resolutions} />
				</NeedsActionRow>
			))}
		</ActionsListFx>
	);
};

ActionsList.displayName = 'ActionsList';

export { ActionsList };
