import {
	FinanceSelect,
	FinanceSelectContent,
	FinanceSelectItem,
	FinanceSelectTrigger,
	FinanceSelectValue,
} from "@internal/ui-library";
import { useCategorySelect } from "@feature/categories";

import type { FC } from "react";
import type { CategoryRef } from "@entity/categories";


interface WalletCategorySelectProps {
	value: CategoryRef | null;
	onChange: (value: CategoryRef | null) => void;
	disabled?: boolean;
	className?: string;
}

const NO_CATEGORY = 'none';

const WalletCategorySelect: FC<WalletCategorySelectProps> = ({ value, onChange, disabled, className }) => {
	const { options, handleChange } = useCategorySelect({ kind: 'wallet', value, onChange });

	return (
		<FinanceSelect value={value?.id ?? NO_CATEGORY} onValueChange={handleChange} disabled={disabled}>
			<FinanceSelectTrigger className={className}>
				<FinanceSelectValue placeholder="No category" />
			</FinanceSelectTrigger>
			<FinanceSelectContent>
				<FinanceSelectItem value={NO_CATEGORY}>
					No category
				</FinanceSelectItem>
				{options.map((option) => (
					<FinanceSelectItem key={option.id} value={option.id}>
						{option.name}
					</FinanceSelectItem>
				))}
			</FinanceSelectContent>
		</FinanceSelect>
	);
};

WalletCategorySelect.displayName = 'WalletCategorySelect';

export { WalletCategorySelect };
export type { WalletCategorySelectProps };
