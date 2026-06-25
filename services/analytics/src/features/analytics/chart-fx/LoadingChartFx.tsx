import {PropsWithChildren} from "react";
import {cn} from "@internal/ui-library";

type LoadingChartFxProps = PropsWithChildren<{
	isLoading: boolean;
}>; 

function LoadingChartFx({ isLoading, children }: LoadingChartFxProps) {
	return (
		<div className="relative w-full h-full grid items-center justify-center">
			<div className={cn(
				isLoading ? '' : 'hidden',
			)}>
				Loading...
			</div>
			<div className={cn(
				isLoading ? 'absolute block opacity-0' : 'contents opacity-100'
			)}>
				{children}
			</div>
		</div>
	);
}

export { LoadingChartFx };