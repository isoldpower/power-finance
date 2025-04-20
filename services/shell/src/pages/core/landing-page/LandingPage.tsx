import type {FC} from "react";

const LandingPage: FC = () => {
	return (
		<div className="landing-page">
			<h1 className="font-bold pb-2">
				Welcome to the Landing Page
			</h1>
			<p>
				This is a simple landing page.
			</p>
		</div>
	);
}

LandingPage.displayName = 'LandingPage';

export { LandingPage };