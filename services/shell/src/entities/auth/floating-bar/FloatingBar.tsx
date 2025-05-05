import type {FC, ReactNode} from "react";
import classes from './FloatingBar.module.css';

interface FloatingBarProps {
	children?: ReactNode;
}

const FloatingBar: FC<FloatingBarProps> = ({ children }) => {
	return (
		<div className={`${classes.floatingBar__box} px-6 py-3 bg-sidebar-accent border rounded-[0.75rem]`}>
			{children}
		</div>
	);
};

FloatingBar.displayName = 'FloatingBar';

export { FloatingBar };
export type { FloatingBarProps };