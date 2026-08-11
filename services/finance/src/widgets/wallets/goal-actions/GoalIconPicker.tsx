import {
	FinanceMenu,
	FinanceMenuContent,
	FinanceMenuTrigger,
} from "@internal/ui-library";

import { GOAL_ICON_NAMES, GoalForm, resolveGoalIcon } from "@entity/wallets";
import { useDisclosure } from "@shared/overlays";

import type { FC } from "react";


interface GoalIconPickerProps {
	value: string;
	onChange: (icon: string) => void;
}

const GoalIconPicker: FC<GoalIconPickerProps> = ({ value, onChange }) => {
	const { open, setOpen, onClose } = useDisclosure();
	const SelectedIcon = resolveGoalIcon(value);

	return (
		<FinanceMenu open={open} onOpenChange={setOpen}>
			<FinanceMenuTrigger asChild>
				<GoalForm.IconTrigger aria-label="Choose icon">
					<SelectedIcon size={18} />
				</GoalForm.IconTrigger>
			</FinanceMenuTrigger>
			<FinanceMenuContent align="start" className="p-2">
				<GoalForm.IconGrid>
					{GOAL_ICON_NAMES.map((iconName) => {
						const Icon = resolveGoalIcon(iconName);

						return (
							<GoalForm.IconOption
								key={iconName}
								aria-label={iconName}
								selected={value === iconName}
								onClick={() => { onChange(iconName); onClose(); }}
							>
								<Icon size={16} />
							</GoalForm.IconOption>
						);
					})}
				</GoalForm.IconGrid>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

GoalIconPicker.displayName = 'GoalIconPicker';

export { GoalIconPicker };
export type { GoalIconPickerProps };
