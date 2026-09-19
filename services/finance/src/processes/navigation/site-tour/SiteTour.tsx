import { WebsiteTour } from "@internal/ui-library";
import { SITE_TOUR_ANCHORS } from "@feature/navigation";
import { useDisclosure } from "@shared/overlays";
import { Caption, RowTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


const SiteTour: FC = () => {
	const { open, setOpen } = useDisclosure(true);

	return (
		<>
			<WebsiteTour.Invite
				open={open}
				onOpenChange={setOpen}
				title="Take a quick tour?"
				description={
					"Five stops through settings, your dashboard, day-to-day management and planning. " +
					"It takes about a minute."
				}
				contentClassName="finance-theme"
			/>
			<WebsiteTour.Step
				order={0}
				selectorId={SITE_TOUR_ANCHORS.dashboardMetrics}
				placement="bottom"
			>
				<RowTitle as="p" size="13.5">
					Your numbers at a glance
				</RowTitle>
				<Caption as="p" size="12.5" className="mt-1">
					Net worth change and cash flow for the period you pick, converted into your
					display currency. Switch period or currency in the header and both cards follow.
				</Caption>
			</WebsiteTour.Step>
			<WebsiteTour.Step
				order={1}
				selectorId={SITE_TOUR_ANCHORS.dashboardActions}
				placement="top"
			>
				<RowTitle as="p" size="13.5">
					What needs you
				</RowTitle>
				<Caption as="p" size="12.5" className="mt-1">
					Anything waiting on a decision collects here — unreviewed rule matches,
					goals drifting off track, transactions we could not categorise. Clear it and
					the panel empties.
				</Caption>
			</WebsiteTour.Step>
			<WebsiteTour.Step
				order={2}
				selectorId={SITE_TOUR_ANCHORS.managementWorkspace}
				placement="bottom"
			>
				<RowTitle as="p" size="13.5">
					Day-to-day management
				</RowTitle>
				<Caption as="p" size="12.5" className="mt-1">
					Wallets live here, the transaction browser sits below them, and further down the
					chart of accounts shows the bookkeeping every transaction posts into — expand a
					row to see its journal entry.
				</Caption>
			</WebsiteTour.Step>
			<WebsiteTour.Step
				order={3}
				selectorId={SITE_TOUR_ANCHORS.planningAutomations}
				placement="right"
			>
				<RowTitle as="p" size="13.5">
					Rules and goals
				</RowTitle>
				<Caption as="p" size="12.5" className="mt-1">
					Automation rules categorise and route money as it arrives; goals track what you
					are saving toward. The what-if card below them models a change before you commit
					to it.
				</Caption>
			</WebsiteTour.Step>
			<WebsiteTour.Step
				order={4}
				selectorId={SITE_TOUR_ANCHORS.planningAssistant}
				placement="left"
			>
				<RowTitle as="p" size="13.5">
					Ask the assistant
				</RowTitle>
				<Caption as="p" size="12.5" className="mt-1">
					Describe a change in plain language and it drafts the rules and goals to match,
					for you to approve. Signals at the top show what it is reacting to right now.
				</Caption>
			</WebsiteTour.Step>
			<WebsiteTour.Step
				order={5}
				selectorId={SITE_TOUR_ANCHORS.settingsWebhooks}
				placement="bottom"
			>
				<RowTitle as="p" size="13.5">
					Webhooks
				</RowTitle>
				<Caption as="p" size="12.5" className="mt-1">
					Register an endpoint and we post every event your account raises to it —
					new transactions, triggered rules, goal progress. Add one here and it starts
					receiving straight away.
				</Caption>
			</WebsiteTour.Step>
		</>
	);
};

SiteTour.displayName = 'SiteTour';

export { SiteTour };
