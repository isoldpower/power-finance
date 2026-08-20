import { UiCard, UiCardContent, UiCardDescription, UiCardHeader, UiCardTitle, cn } from "@internal/ui-library";
import type { FC, ReactNode } from "react";


interface GridChartCardProps {
	children: ReactNode;
	title: string;
	description: string;
	actions?: ReactNode;
}

const GridChartCard: FC<GridChartCardProps> = ({ 
	children,
	title,
	description,
	actions
 }) => {
	return (
		<UiCard className={cn("rounded-none border-none shadow-none")}>
            <UiCardHeader className="flex flex-row gap-4 justify-between items-center">
				<div className="flex flex-col gap-2">
					<UiCardTitle>{title}</UiCardTitle>
					<UiCardDescription>{description}</UiCardDescription>
				</div>
				{actions && actions}
            </UiCardHeader>
            <UiCardContent>
				{children}
			</UiCardContent>
		</UiCard>
	)
}

export { GridChartCard };
