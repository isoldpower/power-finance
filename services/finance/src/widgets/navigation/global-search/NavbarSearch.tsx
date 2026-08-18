import {
	cn,
	FinanceIconButton,
	UiCommand,
	UiCommandEmpty,
	UiCommandGroup,
	UiCommandInput,
	UiCommandList,
	UiDialog,
	UiDialogContent,
	UiDialogDescription,
	UiDialogTitle,
} from "@internal/ui-library";
import { SearchIcon } from "@shared/pure-components/icons";
import { ShowOnDesktop, ShowOnMobile } from "@shared/visibility";
import { SearchTrigger, SearchResult } from "@entity/navigation";
import { useGlobalSearch, useSearchResults } from "@feature/navigation";
import { PAGES } from "./config.ts";

import type { FC } from "react";


const NavbarSearch: FC = () => {
	const { open, setOpen, onOpen, select } = useGlobalSearch();
	const { pageResults, walletResults } = useSearchResults(PAGES);

	return (
		<>
			<ShowOnDesktop>
				<SearchTrigger onClick={onOpen}>
					<SearchTrigger.Icon />
					<SearchTrigger.Label>
						Search…
					</SearchTrigger.Label>
					<SearchTrigger.Shortcut>
						⌘K
					</SearchTrigger.Shortcut>
				</SearchTrigger>
			</ShowOnDesktop>
			<ShowOnMobile>
				<FinanceIconButton aria-label="Search" onClick={onOpen}>
					<SearchIcon />
				</FinanceIconButton>
			</ShowOnMobile>
			<UiDialog open={open} onOpenChange={setOpen}>
				<UiDialogContent className={cn(
					"finance-theme overflow-hidden border-border-strong bg-popover p-4",
					"text-foreground shadow-[var(--shadow-lg)]"
				)}>
					<UiDialogTitle className="sr-only">
						Search
					</UiDialogTitle>
					<UiDialogDescription className="sr-only">
						Search pages and wallets
					</UiDialogDescription>
					<UiCommand>
						<UiCommandInput placeholder="Search…" />
						<UiCommandList>
							<UiCommandEmpty>
								No results found.
							</UiCommandEmpty>
							<UiCommandGroup heading="Pages">
								{pageResults.map((pageResult) => (
									<SearchResult
										key={pageResult.key}
										search={pageResult.search}
										onSelect={() => { select(pageResult.to); }}
									>
										<SearchResult.Label>
											{pageResult.label}
										</SearchResult.Label>
										<SearchResult.Meta>
											{pageResult.meta}
										</SearchResult.Meta>
									</SearchResult>
								))}
							</UiCommandGroup>
							<UiCommandGroup heading="Wallets">
								{walletResults.map((walletResult) => (
									<SearchResult
										key={walletResult.key}
										search={walletResult.search}
										onSelect={() => { select(walletResult.to); }}
									>
										<SearchResult.Label>
											{walletResult.label}
										</SearchResult.Label>
										<SearchResult.Meta>
											{walletResult.meta}
										</SearchResult.Meta>
									</SearchResult>
								))}
							</UiCommandGroup>
						</UiCommandList>
					</UiCommand>
				</UiDialogContent>
			</UiDialog>
		</>
	);
};

NavbarSearch.displayName = 'NavbarSearch';

export { NavbarSearch };
