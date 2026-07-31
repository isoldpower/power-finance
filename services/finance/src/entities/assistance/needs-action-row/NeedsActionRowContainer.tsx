import type { BaseHTMLAttributes, FC } from "react";
import {cn} from "@internal/ui-library";



// <div className="flex items-center gap-3.5 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
// 	<div className={`flex size-[34px] flex-none items-center justify-center rounded-[9px] text-[15px] font-semibold ${iconClass}`}>
// 		{icon}
// 	</div>
// 	<div className="min-w-0 flex-1">
// 		<div className="text-[13.5px] font-semibold">{title}</div>
// 		<div className="mt-px text-xs text-text-2">{subtitle}</div>
// 	</div>
// 	<FinanceButton variant="outline" size="sm" className="flex-none" disabled={disabled} onClick={onResolve}>
// 		{secondaryLabel}
// 	</FinanceButton>
// 	<FinanceButton size="sm" className="flex-none" disabled={disabled} onClick={onResolve}>
// 		{primaryLabel}
// 	</FinanceButton>
// </div>

const NeedsActionRowContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<div 
		className={cn(
			"flex items-center gap-3.5 border-b border-border",
			"px-[18px] py-3.5 last:border-b-0 hover:bg-secondary"
		)} 
		{...props}
	>
		{children}
	</div>
);

NeedsActionRowContainer.displayName = 'NeedsActionRowContainer';

export { NeedsActionRowContainer };