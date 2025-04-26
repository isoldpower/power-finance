import { SignedIn, SignedOut } from "@internal/shared";
import { OverviewWalletsList } from "@widget/wallet";

const OverviewPage = () => {
	return (
		<div className="p-2">
			<>
				<SignedIn>
					Hello from Overview 123!
				</SignedIn>
				<SignedOut>
					Logged out
				</SignedOut>
			</>
			<OverviewWalletsList />
		</div>
	)
}

OverviewPage.displayName = 'OverviewPage';

export { OverviewPage };
export default OverviewPage;
