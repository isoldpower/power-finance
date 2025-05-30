import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@internal/ui-library"
import { FC } from "react";


interface ServiceFeatureCardProps {
	title: string;
	description: string;
	Icon: FC<{ className: string; }>;
}

const ServiceFeatureCard: FC<ServiceFeatureCardProps> = ({
	title,
	description,
	Icon
}) => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center space-x-2">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
						<Icon className="h-6 w-6 text-gray-800" />
					</div>
					<CardTitle>{title}</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription>
					{description}
				</CardDescription>
			</CardContent>
		</Card>
	)
}

ServiceFeatureCard.displayName = 'ServiceFeatureCard';

export { ServiceFeatureCard };