import type {FC, ReactNode} from "react";
import {Button} from "@shared/components";
import {LogIn} from "lucide-react";

interface SignInButtonProps {
	children: ReactNode;
}

const SignInButton: FC<SignInButtonProps> = ({ children }) => {
	return (
		<Button variant='outline' asChild>
			<div className='flex items-center gap-2 w-full'>
				{children}
				<LogIn className="size-4" />
			</div>
		</Button>
	);
};

SignInButton.displayName = 'SignInButton';

export { SignInButton };
export type { SignInButtonProps };
