import type { FC } from "react";
import { BrandIcon, BrandIconTitle } from "@entity/navigation";


interface AdjustedBrandIconProps {
	withTitle?: boolean;
}

const AdjustableBrandIcon: FC<AdjustedBrandIconProps> = ({
	withTitle = false,
}) => (
	<div className="flex items-center gap-2.5">
		<BrandIcon />
		{withTitle && (
			<BrandIconTitle>
				Finance
			</BrandIconTitle>
		)}
	</div>
);

export { AdjustableBrandIcon };
