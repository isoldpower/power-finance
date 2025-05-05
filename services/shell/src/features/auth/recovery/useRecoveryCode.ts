import { useSignIn } from "@clerk/clerk-react";
import {useCallback, useEffect, useState} from "react";

const useRecoveryCode = () => {
	const [error, setError] = useState<string | null>(null);
	const [secondFactor, setSecondFactor] = useState(false);
	const {signIn, setActive, isLoaded} = useSignIn();

	const verifyEmail = useCallback(async (
		email: string
	): Promise<boolean> => {
		if (!signIn || !isLoaded) {
			console.error('signIn is not available')
			setError('Auth Provider is not yet loaded. Please try again in a second.');
			return false;
		}

		return await signIn
			.create({
				strategy: 'reset_password_email_code',
				identifier: email,
			}).then((_) => {
				return true;
			})
			.catch((err) => {
				console.error('error', err.errors[0].longMessage)
				setError(err.errors[0].longMessage)
				return false;
			});
	}, [signIn]);

	const resetPassword = useCallback(async (
		code: string,
		password: string
	): Promise<boolean> => {
		if (!signIn || !isLoaded) {
			console.error('signIn is not available')
			setError('Auth Provider is not yet loaded. Please try again in a second.');
			return false;
		}

		return await signIn
			.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password,
			})
			.then((result) => {
				if (result.status === 'needs_second_factor') {
					setSecondFactor(true);
					setError('');
					return true;
				} else if (result.status === 'complete') {
					setActive({ session: result.createdSessionId });
					setError('');
					return true;
				} else {
					setError('Unknown error. Please try again.');
					return false;
				}
			})
			.catch((err) => {
				console.error('error', err.errors[0].longMessage);
				setError(err.errors[0].longMessage);
				return false;
			})
	}, [signIn]);

	useEffect(() => {

	}, []);

	return { verifyEmail, error, secondFactor, resetPassword };
}

export { useRecoveryCode };
