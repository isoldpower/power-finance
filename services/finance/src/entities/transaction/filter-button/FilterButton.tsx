import { Button } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";


interface FilterButtonProps extends ComponentProps<typeof Button> {
	selected: boolean
}

const FilterButton: FC<FilterButtonProps> = ({ selected, children, ...props }) => {
	return (
		<Button
			variant={selected ? 'secondary' : 'ghost'}
			{...props}
		>
			{children}
		</Button>
	)
}

export { FilterButton };
export type { FilterButtonProps };