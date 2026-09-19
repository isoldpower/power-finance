import type { Automation, AutomationSearchQuery } from "@entity/assistance";


const matchesName = (automation: Automation, needle: string | undefined): boolean => {
	if (!needle) return true;

	return automation.name.toLowerCase().includes(needle.toLowerCase());
};

const matchesEnabled = (automation: Automation, enabled: boolean | undefined): boolean => (
	enabled === undefined || automation.enabled === enabled
);

const matchesMembership = (value: string | null, allowed: string[] | undefined): boolean => {
	if (!allowed?.length) return true;
	if (value === null) return false;

	return allowed.includes(value);
};

const withinWindow = (
	moment: string | null,
	after: string | undefined,
	before: string | undefined,
): boolean => {
	if (!after && !before) return true;
	if (moment === null) return false;

	return (!after || moment >= after) && (!before || moment <= before);
};

const matchesAutomationQuery = (
	automation: Automation,
	query: AutomationSearchQuery,
): boolean => (
	matchesName(automation, query.name) &&
	matchesEnabled(automation, query.enabled) &&
	matchesMembership(automation.trigger.type, query.triggerTypes) &&
	matchesMembership(automation.trigger.event, query.events) &&
	matchesMembership(automation.trigger.schedule, query.schedules) &&
	withinWindow(automation.createdAt, query.createdAfter, query.createdBefore) &&
	withinWindow(automation.lastRunAt, query.ranAfter, query.ranBefore)
);

export { matchesAutomationQuery };
