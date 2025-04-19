import {FC} from "react";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
	return (
		<div>
			<h1>Login Page</h1>
		</div>
	);
};

LoginPage.displayName = 'LoginPage';

export { LoginPage };
export type { LoginPageProps };