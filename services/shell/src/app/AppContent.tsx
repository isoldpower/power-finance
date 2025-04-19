import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree";
import {useEffect} from "react";
import {useSettingsContext} from "@internal/shared";

const router = createRouter({ routeTree })
function AppContents() {
	const { onUpdateField, theme } = useSettingsContext();

	useEffect(() => {
		console.log('shell', theme);
	}, [theme]);

	return (
		<>
			<RouterProvider router={router} />
			<button onClick={() => onUpdateField('theme', theme === 'dark' ? 'light' : 'dark')}>
				Switch (current: {theme})
			</button>
		</>
	)
}

export { AppContents };
export default AppContents;
