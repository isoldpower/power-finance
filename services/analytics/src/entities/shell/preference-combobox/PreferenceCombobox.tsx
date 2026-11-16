import {
	cn,
	FinanceCombobox,
	FinanceComboboxContent,
	FinanceComboboxEmpty,
	FinanceComboboxInput,
	FinanceComboboxList,
	FinanceComboboxTrigger,
} from "@internal/ui-library";
import { PreferenceOption } from "./combobox/PreferenceOption.tsx";

import type { FC, PropsWithChildren, ReactNode } from "react";
import type { PreferenceOptionProps } from "./combobox/PreferenceOption.tsx";


type PreferenceComboboxProps = PropsWithChildren<{
	label: ReactNode;
	searchPlaceholder: string;
	emptyLabel: string;
	isSaving: boolean;
	className?: string;
}>;
type PreferenceComboboxObject = FC<PreferenceComboboxProps> & {
	Option: FC<PreferenceOptionProps>;
};

const PreferenceCombobox: PreferenceComboboxObject = ({
	label,
	searchPlaceholder,
	emptyLabel,
	isSaving,
	className,
	children,
}) => (
	<FinanceCombobox>
		<FinanceComboboxTrigger
			aria-busy={isSaving}
			className={cn(
				"w-full transition-opacity",
				isSaving && "opacity-60",
				className
			)}
		>
			<span className="truncate">
				{label}
			</span>
		</FinanceComboboxTrigger>
		<FinanceComboboxContent>
			<FinanceComboboxInput placeholder={searchPlaceholder} />
			<FinanceComboboxList>
				<FinanceComboboxEmpty>
					{emptyLabel}
				</FinanceComboboxEmpty>
				{children}
			</FinanceComboboxList>
		</FinanceComboboxContent>
	</FinanceCombobox>
);

PreferenceCombobox.Option = PreferenceOption;
PreferenceCombobox.displayName = 'PreferenceCombobox';

export { PreferenceCombobox };
export type { PreferenceComboboxProps };
