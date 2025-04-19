import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {checkEnvVariables} from "./app/env/checkEnv.ts";
import App from './app/App.tsx'

const envVariables = checkEnvVariables()

const root = document.getElementById('root')
if (root) {
	createRoot(root).render(
		<StrictMode>
			<App env={envVariables} />
		</StrictMode>,
	)
}
