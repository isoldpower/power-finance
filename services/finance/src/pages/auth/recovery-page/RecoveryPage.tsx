import type {FC} from "react";

import { useState } from 'react'
import { useSignIn } from '@clerk/clerk-react'
import { GuestGuard } from "@feature/auth";
import {getFinanceRoute, getShellRoute} from "@internal/shared";
import {Link} from "@tanstack/react-router";

interface RecoveryPageProps {}

// TODO: split on files. use FormWizard for the form multiple steps.
const RecoveryPage: FC<RecoveryPageProps> = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [code, setCode] = useState('')
	const [successfulCreation, setSuccessfulCreation] = useState(false)
	const [secondFactor, setSecondFactor] = useState(false)
	const [error, setError] = useState('')

	const {isLoaded, signIn, setActive} = useSignIn();

	async function create(e: React.FormEvent) {
		e.preventDefault();

		await signIn
			?.create({
				strategy: 'reset_password_email_code',
				identifier: email,
			})
			.then((_) => {
				setSuccessfulCreation(true)
				setError('')
			})
			.catch((err) => {
				console.error('error', err.errors[0].longMessage)
				setError(err.errors[0].longMessage)
			})
	}

	async function reset(e: React.FormEvent) {
		e.preventDefault();

		await signIn
			?.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password,
			})
			.then((result) => {
				if (result.status === 'needs_second_factor') {
					setSecondFactor(true)
					setError('')
				} else if (result.status === 'complete') {
					setActive({session: result.createdSessionId})
					setError('')
				} else {
					console.log(result)
				}
			})
			.catch((err) => {
				console.error('error', err.errors[0].longMessage)
				setError(err.errors[0].longMessage)
			})
	}

	return isLoaded && (
		<GuestGuard to={getFinanceRoute('overview')}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				<div style={{ display: 'flex', gap: '1rem' }}>
					<h1>Forgot Password?</h1>
					<Link to={getShellRoute('auth').login}>
						Return
					</Link>
				</div>
				<form
					style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
					onSubmit={!successfulCreation ? create : reset}
				>
					{!successfulCreation && (
						<>
							<label htmlFor="email">Provide your email address</label>
							<input
								type="email"
								placeholder="e.g john@doe.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<button>Send password reset code</button>
							{error && <p>{error}</p>}
						</>
					)}
					{successfulCreation && (
						<>
							<label htmlFor="password">Enter your new password</label>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

							<label htmlFor="password">
								Enter the password reset code that was sent to your email
							</label>
							<input type="code" value={code} onChange={(e) => setCode(e.target.value)}/>

							<button>Reset</button>
							{error && <p>{error}</p>}
						</>
					)}

					{secondFactor && <p>2FA is required, but this UI does not handle that</p>}
				</form>
			</div>
		</GuestGuard>
	)
}

RecoveryPage.displayName = 'RecoveryPage';

export { RecoveryPage };
export type { RecoveryPageProps };