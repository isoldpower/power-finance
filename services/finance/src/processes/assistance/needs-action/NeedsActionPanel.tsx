import { AlertIcon, CheckIcon } from "@shared/pure-components/icons";
import { RowTitle } from "@shared/pure-components/typography";
import { cn, FinanceCard } from "@internal/ui-library";
import { ActionsList } from "@widget/assistance";
import { useActions, NeedsActionBadgeFx } from "@feature/assistance";
import { NeedsActionHeader } from "@entity/assistance";

import {FC, useMemo} from "react";


interface NeedsActionPanelProps {
	descriptor?: string;
	clearDescriptor?: string;
}

const NeedsActionPanel: FC<NeedsActionPanelProps> = ({
	descriptor = 'approvals before money moves',
	clearDescriptor = 'nothing pending',
}) => {
	const { actions, isPending, isError } = useActions();
	const settled = !isPending && !isError;
	const alerting = useMemo(() => {
		return settled && actions.length > 0;
	}, [actions.length, settled]);
	const isAllClear = useMemo(() => {
		return settled && actions.length === 0;
	}, [actions.length, settled]);

	return (
		<FinanceCard
			variant={alerting ? 'accent' : 'default'}
			className={cn("overflow-hidden", !alerting && "border-border bg-secondary")}
		>
			<NeedsActionHeader tone={alerting ? 'accent' : 'neutral'} divided={!isAllClear}>
				{isAllClear ? <CheckIcon size={16} className="text-text-3" /> : <AlertIcon />}
				<RowTitle as="h2" size="14.5">
					{isAllClear ? 'Nothing needs your action' : 'Needs your action'}
				</RowTitle>
				{isPending || actions.length > 0 ? (
					<NeedsActionHeader.Badge>
						<NeedsActionBadgeFx isPending={isPending} isError={isError}>
							{actions.length}
						</NeedsActionBadgeFx>
					</NeedsActionHeader.Badge>
				) : null}
				<div className="flex-1" />
				<NeedsActionHeader.Descriptor>
					{isAllClear ? clearDescriptor : descriptor}
				</NeedsActionHeader.Descriptor>
			</NeedsActionHeader>
			<div className="flex flex-col">
				<ActionsList
					actions={actions}
					isPending={isPending}
					isError={isError}
				/>
			</div>
		</FinanceCard>
	);
};

NeedsActionPanel.displayName = 'NeedsActionPanel';

export { NeedsActionPanel };
export type { NeedsActionPanelProps };
