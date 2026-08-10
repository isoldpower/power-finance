import type { FC, ReactNode } from "react";


interface ShowOnProps {
	condition: boolean;
	children: ReactNode;
}

const ShowOn: FC<ShowOnProps> = ({ condition, children }) => {
	return condition ? children : null;
}

ShowOn.displayName = 'ShowOn';

export { ShowOn };
export type { ShowOnProps };
