import type { ReactNode } from "react";
import {ModuleTitleHighlight} from "./ModuleTitleHighlight.tsx";

interface ModuleTitleProps {
	children: ReactNode
}

function ModuleTitle({
	children
}: ModuleTitleProps) {
	return (
		<h1 style={{ fontSize: '2rem', lineHeight: '2.5rem', fontWeight: 'bold', color: '#dcdcdc' }}>
			{children}
		</h1>
	)
}

ModuleTitle.displayName = 'ModuleTitle';
ModuleTitle.Highlight = ModuleTitleHighlight;

export { ModuleTitle };
export type { ModuleTitleProps };
