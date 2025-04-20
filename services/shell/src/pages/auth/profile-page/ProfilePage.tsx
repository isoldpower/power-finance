import { FC } from "react";
import { UserProfile } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import {getFinanceRoute, useRouteWithOrigin} from "@internal/shared";

interface UserProfilePageProps {}

const UserProfilePage: FC<UserProfilePageProps> = () => {
	const overviewRoute = useRouteWithOrigin(getFinanceRoute('overview'));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<UserProfile
				appearance={{
					baseTheme: dark,
					layout: {
						logoLinkUrl: overviewRoute,
						unsafe_disableDevelopmentModeWarnings: true,
						socialButtonsPlacement: 'bottom',
						socialButtonsVariant: 'blockButton'
					}
				}}>
				<UserProfile.Page label="User Profile" url="terms" labelIcon={<div>icon</div>}>
					hello?
				</UserProfile.Page>
				<UserProfile.Link
					label="Homepage"
					url={overviewRoute}
					labelIcon={<div>arrow</div>} />
			</UserProfile>
		</div>
	);
};

UserProfilePage.displayName = 'UserProfilePage';

export { UserProfilePage };
export type { UserProfilePageProps };