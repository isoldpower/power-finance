import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {checkEnvVariables} from "@app/env/checkEnv.ts";
import App from '@app/App.tsx'


const root = document.getElementById('root');

if (root) {
	checkEnvVariables();
	createRoot(root).render(
		<StrictMode>
			<App />
		</StrictMode>
	)
}
