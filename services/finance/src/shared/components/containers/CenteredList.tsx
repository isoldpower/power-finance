import {FC, ReactNode, useMemo} from "react";


interface CenteredListProps {
	children?: ReactNode
	gap?: number
}

const CenteredList: FC<CenteredListProps> = ({ children, gap }) => {
	const listGap = useMemo<string>(() => (gap ?? 3.5).toString(), [gap]);
	
	return (
		<div className="flex flex-wrap items-center gap-3.5" style={{ gap: `calc(var(--spacing) * ${listGap})` }}>
			{children}
		</div>
	);
}

CenteredList.displayName = 'CenteredList';

export { CenteredList };