import { useEffect } from "react"
import { useSettingsContext } from "@internal/shared";

interface ThemeHandlerProps {
	children?: React.ReactNode
}

export function ThemeHandler({
  children,
}: ThemeHandlerProps) {
	const { theme } = useSettingsContext();
	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove("light", "dark")
		root.classList.add(theme)
	}, [theme]);

	return children;
}