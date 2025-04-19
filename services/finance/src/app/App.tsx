import './styles/index.css'

import { getFinanceRoute, SettingsProvider } from "@internal/shared";
import { lazy, Suspense } from "react";
import { ClerkProvider } from '@clerk/clerk-react'

const AppContentsLazy = lazy(() => import('./AppContent.tsx'));

interface AppProps {
	env: ImportMetaEnv
}

function App({ env }: AppProps) {
	return (
		<ClerkProvider
			publishableKey={env.CLIENT_CLERK_PUBLIC_KEY}
			afterSignOutUrl={getFinanceRoute('overview')}
			signInFallbackRedirectUrl={getFinanceRoute('overview')}
			signUpFallbackRedirectUrl={getFinanceRoute('overview')}
		>
			<SettingsProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<AppContentsLazy />
				</Suspense>
			</SettingsProvider>
		</ClerkProvider>
	)
}

export default App
