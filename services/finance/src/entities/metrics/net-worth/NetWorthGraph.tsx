import { cn } from "@internal/ui-library";
import { NetWorthActivePoint } from "./graph/NetWorthActivePoint.tsx";
import { NetWorthSparkline } from "./graph/NetWorthSparkline.tsx";
import { NetWorthSparklineTip } from "./graph/NetWorthSparklineTip.tsx";
import { NetWorthTooltip } from "./graph/NetWorthTooltip.tsx";

import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { NetWorthActivePointProps } from "./graph/NetWorthActivePoint.tsx";
import type { NetWorthSparklineProps } from "./graph/NetWorthSparkline.tsx";
import type { NetWorthSparklineTipProps } from "./graph/NetWorthSparklineTip.tsx";
import type { NetWorthTooltipProps } from "./graph/NetWorthTooltip.tsx";


type NetWorthGraphProps = PropsWithChildren<Omit<ComponentProps<'div'>, 'className'>>;
type NetWorthGraphObject = FC<NetWorthGraphProps> & {
	ActivePoint: FC<NetWorthActivePointProps>;
	Sparkline: FC<NetWorthSparklineProps>;
	Tip: FC<NetWorthSparklineTipProps>;
	Tooltip: FC<NetWorthTooltipProps>;
}

const NetWorthGraph: NetWorthGraphObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative mt-3.5 h-[92px] cursor-crosshair"
		)}
		{...props}
	>
		{children}
	</div>
);

NetWorthGraph.ActivePoint = NetWorthActivePoint;
NetWorthGraph.Sparkline = NetWorthSparkline;
NetWorthGraph.Tip = NetWorthSparklineTip;
NetWorthGraph.Tooltip = NetWorthTooltip;
NetWorthGraph.displayName = 'NetWorthGraph';

export { NetWorthGraph };
export type { NetWorthGraphProps };
