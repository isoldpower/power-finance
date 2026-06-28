import type { FC } from "react";

const BrandMark: FC = () => (
	<>
		<span className="flex size-6 items-center justify-center rounded-[7px] bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]">
			<span className="size-[9px] rounded-[2px] bg-white/90" />
		</span>
		<span className="font-display text-base font-semibold tracking-[-0.01em]">Finance</span>
	</>
);

BrandMark.displayName = 'BrandMark';

export { BrandMark };
