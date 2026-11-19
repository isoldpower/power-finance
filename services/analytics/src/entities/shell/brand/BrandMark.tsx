import { cn } from "@internal/ui-library";
import { Text } from "@internal/shared";

import type { FC } from "react";


interface BrandMarkProps {
	label: string;
}

const BrandMark: FC<BrandMarkProps> = ({ label }) => (
	<span className="flex items-center gap-2.5">
		<span
			className={cn(
				"flex size-6 items-end justify-center gap-[2px] rounded-[7px] pb-[5px]",
				"bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]",
			)}
		>
			<span className="h-[5px] w-[3px] rounded-[1px] bg-white/80" />
			<span className="h-[9px] w-[3px] rounded-[1px] bg-white/90" />
			<span className="h-[7px] w-[3px] rounded-[1px] bg-white/80" />
		</span>
		<Text size="14" weight="semibold" family="display" className="hidden sm:inline">
			{label}
		</Text>
	</span>
);

BrandMark.displayName = 'BrandMark';

export { BrandMark };
export type { BrandMarkProps };
