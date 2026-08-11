import { BrandIcon } from "@entity/navigation";
import { Heading } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AdjustedBrandIconProps {
	withTitle?: boolean;
}

const AdjustableBrandIcon: FC<AdjustedBrandIconProps> = ({
	withTitle = false,
}) => (
	<div className="flex items-center gap-2.5">
		<BrandIcon />
		{withTitle && (
			<Heading as="span" size="base">
				Finance
			</Heading>
		)}
	</div>
);

export { AdjustableBrandIcon };
