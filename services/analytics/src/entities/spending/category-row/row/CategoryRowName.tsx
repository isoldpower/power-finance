import { useMemo } from "react";
import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface CategoryRowNameProps {
	color: string;
	label: string;
	caption: ReactNode;
}

const CategoryRowName: FC<CategoryRowNameProps> = ({ color, label, caption }) => {
	const swatchStyle = useMemo(() => {
		return { background: color };
	}, [color]);

	return (
		<span className="flex min-w-0 items-center gap-2.5">
			<span className="size-2.5 shrink-0 rounded-[3px]" style={swatchStyle} />
			<span className="flex min-w-0 flex-col">
				<Text size="13" weight="semibold" truncate>
					{label}
				</Text>
				<Text size="11" tone="subtle" family="numeric">
					{caption}
				</Text>
			</span>
		</span>
	);
};

CategoryRowName.displayName = 'CategoryRowName';

export { CategoryRowName };
export type { CategoryRowNameProps };
