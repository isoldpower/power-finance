import type {FC, ReactNode} from "react";
import { Heading } from "@internal/shared";


interface SlideOverTitleProps {
	children: ReactNode;
}

const SlideOverTitle: FC<SlideOverTitleProps> = ({ children }) => {
	return (
		<Heading className="flex-1">
			{children}
		</Heading>
	);
}

export { SlideOverTitle };
export type { SlideOverTitleProps };