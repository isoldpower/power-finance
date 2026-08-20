import {cn} from "@internal/ui-library";
import {BaseHTMLAttributes, type CSSProperties, FC, useMemo} from "react";


interface LadderAppearanceProps extends BaseHTMLAttributes<HTMLDivElement> {
	order: number;
	appearStepMs?: number
	appearMsCap?: number
}

const LadderAppearance: FC<LadderAppearanceProps> = ({ 
	order,
	appearStepMs = 45,
	appearMsCap = 450,
	children,
	style,
	...props
}) => {
	const appearDelayMs = useMemo(() => {
		return Math.min(order * appearStepMs, appearMsCap);
	}, [appearMsCap, appearStepMs, order]);
	const appearStyle: CSSProperties = useMemo(() => {
		return {
			...style,
			animationDelay: `${appearDelayMs.toString()}ms`,
		};
	}, [appearDelayMs, style]);
	
	return (
		<div className={cn("fx-rise")} style={appearStyle} {...props}>
			{children}
		</div>
	);
}

export { LadderAppearance };