import { GoalDialog } from "@entity/wallets";
import { BodyText, RowTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


interface GoalDispositionOptionProps {
	title: string;
	description: string;
	selected: boolean;
	onSelect: () => void;
}

const GoalDispositionOption: FC<GoalDispositionOptionProps> = ({
	title,
	description,
	selected,
	onSelect,
}) => (
	<GoalDialog.Option selected={selected} onClick={onSelect}>
		<GoalDialog.Radio selected={selected} />
		<GoalDialog.Content>
			<RowTitle size="13">
				{title}
			</RowTitle>
			<BodyText size="11.5">
				{description}
			</BodyText>
		</GoalDialog.Content>
	</GoalDialog.Option>
);

GoalDispositionOption.displayName = 'GoalDispositionOption';

export { GoalDispositionOption };
export type { GoalDispositionOptionProps };
