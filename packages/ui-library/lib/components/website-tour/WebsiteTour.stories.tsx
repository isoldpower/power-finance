import { useState } from "react";
import { WebsiteTour } from "./website-tour.tsx";
import { UiButton, UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@/entities/root";

import type { Meta, StoryObj } from "@storybook/react-vite";


const meta = {
	title: "Components/WebsiteTour",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`WebsiteTour` spotlights parts of a live page and walks through them one step at a time. Steps are declared with `WebsiteTour.Step`, which registers itself on mount and renders nothing — each one points at an element `id` already on the page.",
					"`WebsiteTour.Invite` asks whether to begin, `WebsiteTour.Trigger` starts the tour from any button, and passing `storageKey` persists completion in `localStorage` so a first-launch tour only runs once. Arrow keys move between steps and `Escape` dismisses the tour.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const TourStage = () => (
	<div className="flex gap-4">
		<UiCard id="story-tour-balance" className="flex-1">
			<UiCardHeader>
				<UiCardTitle>Balance</UiCardTitle>
			</UiCardHeader>
			<UiCardContent>$12,480.50</UiCardContent>
		</UiCard>
		<UiCard id="story-tour-activity" className="flex-1">
			<UiCardHeader>
				<UiCardTitle>Activity</UiCardTitle>
			</UiCardHeader>
			<UiCardContent>18 transactions this week</UiCardContent>
		</UiCard>
	</div>
);

const Guided: Story = {
	parameters: {
		docs: { description: { story: "Two steps over a small dashboard. `WebsiteTour.Trigger` wraps any button to start the walkthrough." } },
	},
	render: () => (
		<WebsiteTour>
			<div className="space-y-4 p-6">
				<WebsiteTour.Trigger>
					<UiButton>Take the tour</UiButton>
				</WebsiteTour.Trigger>
				<TourStage />
			</div>
			<WebsiteTour.Step order={0} selectorId="story-tour-balance" placement="bottom">
				<p className="text-sm font-semibold">Your balance</p>
				<p className="mt-1 text-sm text-muted-foreground">
					Every wallet, converted to your display currency.
				</p>
			</WebsiteTour.Step>
			<WebsiteTour.Step order={1} selectorId="story-tour-activity" placement="bottom">
				<p className="text-sm font-semibold">Recent activity</p>
				<p className="mt-1 text-sm text-muted-foreground">
					Transactions land here as soon as they post.
				</p>
			</WebsiteTour.Step>
		</WebsiteTour>
	),
};

const FirstLaunch = () => {
	const [inviteOpen, setInviteOpen] = useState(true);

	return (
		<WebsiteTour>
			<div className="space-y-4 p-6">
				<TourStage />
			</div>
			<WebsiteTour.Invite open={inviteOpen} onOpenChange={setInviteOpen} />
			<WebsiteTour.Step order={0} selectorId="story-tour-balance" placement="bottom">
				<p className="text-sm font-semibold">Start here</p>
				<p className="mt-1 text-sm text-muted-foreground">
					The invite dialog opens on first launch and hands off to the tour.
				</p>
			</WebsiteTour.Step>
			<WebsiteTour.Step order={1} selectorId="story-tour-activity" placement="left">
				<p className="text-sm font-semibold">Then here</p>
				<p className="mt-1 text-sm text-muted-foreground">
					Pass `storageKey` to remember that this ran.
				</p>
			</WebsiteTour.Step>
		</WebsiteTour>
	);
};

const WithInvite: Story = {
	parameters: {
		docs: { description: { story: "The first-launch shape — `WebsiteTour.Invite` offers the tour before anything is highlighted, and skipping marks it complete." } },
	},
	render: () => <FirstLaunch />,
};


export { Guided, WithInvite };
export default meta;
