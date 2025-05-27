import type { FC, ReactNode } from "react";

interface ModuleTitleHighlightProps {
	children: ReactNode
	addSpace?: boolean
}

const ModuleTitleHighlight: FC<ModuleTitleHighlightProps> = ({
	children,
	addSpace = false
}) => {
	return (
		<span style={{ color: "#ff746c" }}>
			{children}
			{addSpace ? " " : null}
		</span>
	)
}

ModuleTitleHighlight.displayName = 'ModuleTitleHighlight';

export { ModuleTitleHighlight };
export type { ModuleTitleHighlightProps };
