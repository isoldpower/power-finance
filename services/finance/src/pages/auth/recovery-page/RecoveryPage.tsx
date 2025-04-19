import {FC} from "react";

interface RecoveryPageProps {}

const RecoveryPage: FC<RecoveryPageProps> = () => {
	return (
		<div>
			<h1>Recovery Page</h1>
		</div>
	);
};

RecoveryPage.displayName = 'RecoveryPage';

export { RecoveryPage };
export type { RecoveryPageProps };