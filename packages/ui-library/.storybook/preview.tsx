import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import "../lib/styles/_index.css";

const preview: Preview = {
	parameters: {
		layout: "fullscreen",
		controls: {
			matchers: { color: /(background|color)$/i, date: /Date$/i },
		},
	},
	decorators: [
		withThemeByClassName({
			themes: { light: "", dark: "dark" },
			defaultTheme: "light",
		}),
		(Story) => (
			<div className="finance-theme min-h-screen bg-background p-8 text-foreground">
				<Story />
			</div>
		),
	],
};

export default preview;
