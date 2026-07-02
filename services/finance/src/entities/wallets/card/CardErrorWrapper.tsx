import { cn } from "@internal/ui-library";
import type { FC } from "react";

interface CardErrorWrapperProps {
	className?: string;
}

const CardErrorWrapper: FC<CardErrorWrapperProps> = ({ className }) => {
	return (
		<div className={cn('opacity-50 bg-red-300', className)} />
	)
}

CardErrorWrapper.displayName = 'CardErrorWrapper';

export { CardErrorWrapper };