import {FC} from "react";

interface SignupPageProps {}

const SignupPage: FC<SignupPageProps> = () => {
	return (
		<div>
			<h1>Signup Page</h1>
		</div>
	);
};

SignupPage.displayName = 'SignupPage';

export { SignupPage };
export type { SignupPageProps };