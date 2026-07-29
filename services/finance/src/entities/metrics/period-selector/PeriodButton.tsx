import type {FC, MouseEventHandler, ReactNode} from "react";
import { cn } from "@internal/ui-library";


interface PeriodButtonProps {
	isSelected: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
	children: ReactNode;
}

const PeriodButton: FC<PeriodButtonProps> = ({ 
	isSelected,
	onClick,
	children,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"px-3 py-1.5 transition-colors",
				isSelected ? "bg-primary text-white" : "bg-card text-text-3 hover:bg-secondary"
			)}
		>
			{children}
		</button>
	);
};

PeriodButton.displayName = 'PeriodButton';

export { PeriodButton };
export type { PeriodButtonProps };
