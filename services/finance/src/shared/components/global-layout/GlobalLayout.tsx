import type { FC, ReactNode } from "react";
import { useState } from "react";

import { PopoverTrigger, PopoverContent, Popover } from "@internal/ui-library";

import { RelativeBreadcrumbs } from "./RelativeBreadcrumbs.tsx";
import { HeaderBox } from "@shared/components";
import { PreferredCurrencySelection, GlobalLocaleSelection } from "@widget/preferences";
import { PreferencesButton, PreferencesModalBox } from "@entity/preferences";
import {Link} from "@tanstack/react-router";
import {getFinanceRoute} from "@internal/shared";

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
					<RelativeBreadcrumbs root={getFinanceRoute('dashboard')} />
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<PreferencesButton />
						</PopoverTrigger>
						<PopoverContent className="min-w-80 grow w-fit mr-4">
							<PreferencesModalBox>
								<PreferredCurrencySelection />
								<GlobalLocaleSelection />
							</PreferencesModalBox>
						</PopoverContent>
					</Popover>
				</div>
			</HeaderBox>
			<main>
				{children}
			</main>
		</div>
	)
}

export { GlobalLayout };