import { cn } from "@internal/ui-library";
import type { FC, ReactNode } from "react";


interface CardUnavailableWrapperProps {
	className?: ReactNode;
}

const CardUnavailableWrapper: FC<CardUnavailableWrapperProps> = ({ className }) => {
	return (
		<div className={cn('opacity-50 bg-gray-200 dark:bg-gray-900 rounded-lg', className)} />
	)
}

CardUnavailableWrapper.displayName = 'CardUnavailableWrapper';

export { CardUnavailableWrapper };