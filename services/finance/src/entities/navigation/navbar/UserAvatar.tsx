import {ComponentProps, useMemo} from "react";
import { FinanceAvatar } from "@internal/ui-library";

import type { FC } from "react";


interface UserAvatarProps {
	firstName?: string | null;
	lastName?: string | null;
	size?: ComponentProps<typeof FinanceAvatar>['size'];
}

const UserAvatar: FC<UserAvatarProps> = ({ 
	firstName,
	lastName,
	size,
}) => {
	const initials = useMemo(() => {
		const firstNameProtected = firstName ?? 'N';
		const lastNameProtected = lastName ?? 'A';
		
		return (firstNameProtected[0] + lastNameProtected[0]).toUpperCase();
	}, [firstName, lastName]);
	
	return (
		<FinanceAvatar initials={initials} size={size} />
	);
}

UserAvatar.displayName = 'UserAvatar';

export { UserAvatar };
export type { UserAvatarProps };
