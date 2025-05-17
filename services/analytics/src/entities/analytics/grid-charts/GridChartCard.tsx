import { Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from "@internal/ui-library";
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
		<Card className={cn("rounded-none border-none shadow-none")}>
            <CardHeader className="flex flex-row gap-4 justify-between items-center">
				<div className="flex flex-col gap-2">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
				{actions && actions}
            </CardHeader>
            <CardContent>
				{children}
			</CardContent>
		</Card>
	)
}

export { GridChartCard };
