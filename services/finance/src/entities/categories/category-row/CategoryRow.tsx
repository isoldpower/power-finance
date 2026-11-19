import { cn } from "@internal/ui-library";
import { pendingClass } from "@internal/shared";
import { CategoryRowControls } from "./row/CategoryRowControls.tsx";
import { CategoryRowName } from "./row/CategoryRowName.tsx";

import type { FC, PropsWithChildren } from "react";
import type { CategoryRowControlsProps } from "./row/CategoryRowControls.tsx";
import type { CategoryRowNameProps } from "./row/CategoryRowName.tsx";


type CategoryRowProps = PropsWithChildren<{
	pending?: boolean;
}>;
type CategoryRowObject = FC<CategoryRowProps> & {
	Controls: FC<CategoryRowControlsProps>;
	Name: FC<CategoryRowNameProps>;
};

const CategoryRow: CategoryRowObject = ({ pending, children }) => (
	<li
		className={cn(
			"flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-b-0",
			pendingClass(pending)
		)}
	>
		{children}
	</li>
);

CategoryRow.Controls = CategoryRowControls;
CategoryRow.Name = CategoryRowName;
CategoryRow.displayName = 'CategoryRow';

export { CategoryRow };
export type { CategoryRowProps };
