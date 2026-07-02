import type { FC } from "react";
import { FinanceIconButton } from "@internal/ui-library";

import { SearchField, SearchIcon } from "@entity/navigation";
import { SearchResultsPanel } from "./SearchResultsPanel.tsx";
import { useGlobalSearch, useSearchResults } from "@feature/navigation/website-search";
import { useIsDesktop } from "@shared/utils";

import { PAGES } from "../config.ts";

const NavbarSearch: FC = () => {
	const { query, setQuery, open, setOpen, inputRef, select } = useGlobalSearch();
	const { pageResults, walletResults, hasResults } = useSearchResults(query, PAGES);
	const isDesktop = useIsDesktop();

	return (
		<div className="relative">
			{isDesktop ? (
				<SearchField
					inputRef={inputRef}
					value={query}
					onValueChange={setQuery}
					open={open}
					onFocus={() => { setOpen(true); }}
					onBlur={() => { setOpen(false); }}
				/>
			) : (
				/* Folded icon — below 1024px */
				<FinanceIconButton aria-label="Search" onClick={() => { setOpen((value) => !value); }}>
					<SearchIcon />
				</FinanceIconButton>
			)}

			{open ? (
				<SearchResultsPanel
					isDesktop={isDesktop}
					value={query}
					onValueChange={setQuery}
					onBlur={() => { setOpen(false); }}
					pageResults={pageResults}
					walletResults={walletResults}
					hasResults={hasResults}
					onSelect={select}
				/>
			) : null}
		</div>
	);
};

NavbarSearch.displayName = 'NavbarSearch';

export { NavbarSearch };
