import type { FC, ReactNode } from "react";
import { useState } from "react";

import {UiPopoverTrigger, UiPopoverContent, UiPopover, UiButton} from "@internal/ui-library";

import { HeaderBox, RelativeBreadcrumbs } from "@shared/components";
import { PreferredCurrencySelection, GlobalLocaleSelection } from "@widget/settings";
import { PreferencesButton, PreferencesModalBox } from "@entity/settings";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";


interface GlobalLayoutProps {
	children: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col">
			<HeaderBox>
				<Link className="flex items-center" to={getFinanceRoute('dashboard')}>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
						Finance App
					</h1>
				</Link>
				<div className="flex gap-8 basis-[400px]">
					<RelativeBreadcrumbs />
					<UiPopover open={open} onOpenChange={setOpen}>
						<UiPopoverTrigger asChild>
							<PreferencesButton />
						</UiPopoverTrigger>
						<UiPopoverContent className="min-w-80 grow w-fit mr-4">
							<PreferencesModalBox>
								<PreferredCurrencySelection />
								<GlobalLocaleSelection />
								<UiButton asChild>
									<Link to={getFinanceRoute('settings')}>
										More settings
									</Link>
								</UiButton>
							</PreferencesModalBox>
						</UiPopoverContent>
					</UiPopover>
				</div>
			</HeaderBox>
			<main>
				{children}
			</main>
		</div>
	)
}

export { GlobalLayout };