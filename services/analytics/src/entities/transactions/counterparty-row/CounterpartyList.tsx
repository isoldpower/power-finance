import { useMemo } from "react";
import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type CounterpartyListProps = PropsWithChildren<{
	label: string;
	height?: number;
}>;

const CounterpartyList: FC<CounterpartyListProps> = ({ label, height, children }) => {
	const style = useMemo(() => {
		return height === undefined ? undefined : { height };
	}, [height]);

	return (
		<ol
			aria-label={label}
			style={style}
			className={cn(
				"grid content-start gap-0.5",
				height !== undefined && "-mr-2 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]",
			)}
		>
			{children}
		</ol>
	);
};

CounterpartyList.displayName = 'CounterpartyList';

export { CounterpartyList };
export type { CounterpartyListProps };
