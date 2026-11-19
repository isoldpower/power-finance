import { useMemo } from "react";
import { FinanceAvatar } from "@internal/ui-library";
import { userInitials } from "@internal/shared";

import type { ComponentProps, FC } from "react";


interface UserAvatarProps {
	firstName?: string | null;
	lastName?: string | null;
	size?: ComponentProps<typeof FinanceAvatar>['size'];
}

const UserAvatar: FC<UserAvatarProps> = ({ firstName, lastName, size }) => {
	const initials = useMemo(() => {
		return userInitials(firstName, lastName);
	}, [firstName, lastName]);

	return (
		<FinanceAvatar initials={initials} size={size} />
	);
};

UserAvatar.displayName = 'UserAvatar';

export { UserAvatar };
export type { UserAvatarProps };
