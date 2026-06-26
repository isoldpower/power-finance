import { UiButton } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";


interface FilterButtonProps extends ComponentProps<typeof UiButton> {
	selected: boolean
}

const FilterButton: FC<FilterButtonProps> = ({ selected, children, ...props }) => {
	return (
		<UiButton
			variant={selected ? 'secondary' : 'ghost'}
			{...props}
		>
			{children}
		</UiButton>
	)
}

export { FilterButton };
export type { FilterButtonProps };