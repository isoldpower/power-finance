import { cn } from "@internal/ui-library";
import type { FC } from "react";


interface BackgroundGlowProps {
	size: number
}

const BackgroundGlow: FC<BackgroundGlowProps> = ({
	size,
}) => {
	return (
		<div
			className={cn(
				"pointer-events-none absolute -right-10 -top-[50px]",
				`-z-10 size-[${size.toString()}px] rounded-full`,
				"bg-[radial-gradient(circle,var(--glow),transparent_68%)]",
			)}
		/>
	);
}

BackgroundGlow.displayName = 'BackgroundGlow';

export { BackgroundGlow };
export type { BackgroundGlowProps };
