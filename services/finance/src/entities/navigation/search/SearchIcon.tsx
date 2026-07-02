import type { FC } from "react";

const SearchIcon: FC = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
		<circle cx="11" cy="11" r="7" />
		<line x1="21" y1="21" x2="16.65" y2="16.65" />
	</svg>
);

SearchIcon.displayName = 'SearchIcon';

export { SearchIcon };
