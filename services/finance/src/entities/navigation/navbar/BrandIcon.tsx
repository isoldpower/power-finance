import type { FC } from "react";
import { cn } from "@internal/ui-library";


const BrandIcon: FC = () => (
	<span className={cn(
		"flex size-6 items-center justify-center rounded-[7px]",
		"bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]",
	)}>
		<span className="size-[9px] rounded-[2px] bg-white/90" />
	</span>
);

BrandIcon.displayName = 'BrandIcon';

export { BrandIcon };
