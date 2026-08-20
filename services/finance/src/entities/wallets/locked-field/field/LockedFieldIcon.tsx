import { LockIcon } from "@shared/pure-components/icons";

import type { FC } from "react";


const LockedFieldIcon: FC = () => (
	<LockIcon size={14} className="mt-0.5 flex-none" />
);

LockedFieldIcon.displayName = 'LockedFieldIcon';

export { LockedFieldIcon };
