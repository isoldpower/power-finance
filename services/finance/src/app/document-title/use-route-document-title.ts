import { useEffect } from "react";
import { useMatches } from "@tanstack/react-router";
import { formatDocumentTitle } from "@internal/shared";


declare module '@tanstack/react-router' {
	interface StaticDataRouteOption {
		title?: string;
	}
}

function useRouteDocumentTitle(): void {
	const title = useMatches({
		select: (matches) => matches.reduce<string | undefined>(
			(deepestTitle, match) => match.staticData.title ?? deepestTitle,
			undefined
		),
	});

	useEffect(() => {
		if (title !== undefined) {
			document.title = formatDocumentTitle(title);
		}
	}, [title]);
}

export { useRouteDocumentTitle };
