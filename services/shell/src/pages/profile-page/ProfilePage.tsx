import { FC } from "react";
import { clerk } from "@internal/shared";
import { getProfilePaperAppearance } from "@entity/auth";
import { getFinanceRoute, useRouteWithOrigin } from "@internal/shared";
import { ArrowLeftCircleIcon } from "lucide-react";

type UserProfilePageProps = object & {}

const UserProfilePage: FC<UserProfilePageProps> = () => {
	const overviewRoute = getFinanceRoute('dashboard');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<clerk.UserProfile appearance={getProfilePaperAppearance()}>
				<clerk.UserProfile.Link
					label="Homepage"
					url={useRouteWithOrigin(overviewRoute)}
					labelIcon={<ArrowLeftCircleIcon width={16} height={16} />} />
			</clerk.UserProfile>
		</div>
	);
};

UserProfilePage.displayName = 'UserProfilePage';

export { UserProfilePage };
export type { UserProfilePageProps };