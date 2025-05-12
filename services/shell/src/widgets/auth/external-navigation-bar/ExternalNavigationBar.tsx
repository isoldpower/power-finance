import type { FC } from "react";
import { FloatingBar } from "@entity/auth";
import { ArrowLeft } from "lucide-react";
import { NavigateToLanding } from "@feature/auth";
import { HideOnRoute } from "@shared/components";
import { getShellRoute, NavigateToRecovery, NavigateToSignIn } from "@internal/shared";


type ExternalNavigationBarProps = object & {};

const ExternalNavigationBar: FC<ExternalNavigationBarProps> = () => {
	const authRoutes = getShellRoute('auth');

	return (
		<FloatingBar>
			<div className='flex justify-between items-center'>
				<NavigateToLanding className="underline text-accent-foreground text-sm">
					<ArrowLeft width={16} height={16} />
				</NavigateToLanding>
				<HideOnRoute routes={[authRoutes.profile, authRoutes.recovery]}>
					<NavigateToRecovery hideOnActive className="underline text-accent-foreground text-sm">
						Forgot password?
					</NavigateToRecovery>
				</HideOnRoute>
				<HideOnRoute routes={[authRoutes.profile, authRoutes.login, authRoutes.signup]}>
					<NavigateToSignIn hideOnActive className="underline text-accent-foreground text-sm">
						Sign in
					</NavigateToSignIn>
				</HideOnRoute>
			</div>
		</FloatingBar>
	)
}

ExternalNavigationBar.displayName = 'ExternalNavigationBar';

export { ExternalNavigationBar };
export type { ExternalNavigationBarProps };