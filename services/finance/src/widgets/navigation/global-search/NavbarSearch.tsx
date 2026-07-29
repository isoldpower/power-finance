import type { FC } from "react";
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
import { SearchIcon, SearchTrigger, SearchResult } from "@entity/navigation";
import { useGlobalSearch, useSearchResults } from "@feature/navigation";
import { ShowOnDesktop, ShowOnMobile } from "@shared/components";
import { PAGES } from "./config.ts";


const NavbarSearch: FC = () => {
	const { open, setOpen, onOpen, select } = useGlobalSearch();
	const { pageResults, walletResults } = useSearchResults(PAGES);

	return (
		<>
			<ShowOnDesktop>
				<SearchTrigger onClick={onOpen} />
			</ShowOnDesktop>
			<ShowOnMobile>
				<FinanceIconButton aria-label="Search" onClick={onOpen}>
					<SearchIcon />
				</FinanceIconButton>
			</ShowOnMobile>
			<UiDialog open={open} onOpenChange={setOpen}>
				<UiDialogContent className={cn(
					"finance-theme overflow-hidden border-border-strong bg-popover p-0",
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
								{pageResults.map(({ key, ...pageResult }) => (
									<SearchResult
										onSelect={() => { select(pageResult.to); }}
										key={key}
										{...pageResult}
									/>
								))}
							</UiCommandGroup>
							<UiCommandGroup heading="Wallets">
								{walletResults.map(({ key, ...walletResult }) => (
									<SearchResult
										onSelect={() => { select(walletResult.to); }}
										key={key}
										{...walletResult}
									/>
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
