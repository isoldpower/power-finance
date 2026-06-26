import type {FC, ReactNode} from "react";
import {LogIn} from "lucide-react";
import { UiButton } from "@internal/ui-library";

interface SignInButtonProps {
	children: ReactNode;
}

const SignInButton: FC<SignInButtonProps> = ({ children }) => {
	return (
		<UiButton variant='outline' asChild>
			<div className='flex items-center gap-2 w-full'>
				{children}
				<LogIn className="size-4" />
			</div>
		</UiButton>
	);
};

SignInButton.displayName = 'SignInButton';

export { SignInButton };
export type { SignInButtonProps };
