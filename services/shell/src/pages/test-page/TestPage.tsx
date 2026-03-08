import { ErrorBoundary } from "react-error-boundary";
import { clerk } from "@internal/shared";
import { useEffect, useState } from "react";

function TestPage() {
	const [token, setToken] = useState<string>('loading');
	const { getToken } = clerk.useAuth();

	useEffect(() => {
		getToken()
			.then((token) => {
				setToken(token ?? 'error');
			})
			.catch((err: unknown) => {
				setToken(typeof err === 'string' 
					? err 
					: (err as { message: string }).message);
			})
	}, [getToken]);
	
	return (
		<div className="flex flex-col items-stretch gap-10 min-h-screen">
			<ErrorBoundary fallback={<div>Failed loading analytics module</div>}>
				Your token is:
				<strong>{token}</strong>
			</ErrorBoundary>
		</div>
	)
}

export { TestPage };
