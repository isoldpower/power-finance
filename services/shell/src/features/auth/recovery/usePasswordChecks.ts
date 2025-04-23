import { useCallback } from "react";

const usePasswordChecks = () => {
	const checkPasswordStrength = useCallback(async (
		_: string
	): Promise<boolean> => {
		return true;
	}, []);

	const checkPasswordCompromised = useCallback(async (
		_: string
	): Promise<boolean> => {
		return true;
	}, []);

	return { checkPasswordCompromised, checkPasswordStrength };
}

export { usePasswordChecks };
