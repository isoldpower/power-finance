import { FC } from "react";
import { UserProfile } from "@clerk/clerk-react";
import { getProfilePaperAppearance } from "@entity/auth";
import { getFinanceRoute, useRouteWithOrigin } from "@internal/shared";
import {ArrowLeftCircleIcon} from "lucide-react";

interface UserProfilePageProps {}

const UserProfilePage: FC<UserProfilePageProps> = () => {
	const overviewRoute = getFinanceRoute('overview');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<UserProfile appearance={getProfilePaperAppearance()}>
				<UserProfile.Link
					label="Homepage"
					url={useRouteWithOrigin(overviewRoute)}
					labelIcon={<ArrowLeftCircleIcon width={16} height={16} />} />
			</UserProfile>
		</div>
	);
};

UserProfilePage.displayName = 'UserProfilePage';

export { UserProfilePage };
export type { UserProfilePageProps };