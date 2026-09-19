import { SITE_TOUR_ANCHORS } from "./tour-anchors.ts";

import type { SiteTourStop } from "./types.ts";


const SITE_TOUR_STORAGE_KEY = 'finance:site-tour-completed';

const SITE_TOUR_STOPS: SiteTourStop[] = [
	{ 
		anchor: SITE_TOUR_ANCHORS.dashboardMetrics,
		route: 'dashboard'
	},
	{ 
		anchor: SITE_TOUR_ANCHORS.dashboardActions,
		route: 'dashboard'
	},
	{ 
		anchor: SITE_TOUR_ANCHORS.managementWorkspace,
		route: 'management'
	},
	{ 
		anchor: SITE_TOUR_ANCHORS.planningAutomations,
		route: 'planning'
	},
	{ 
		anchor: SITE_TOUR_ANCHORS.planningAssistant,
		route: 'planning'
	},
	{ 
		anchor: SITE_TOUR_ANCHORS.settingsWebhooks,
		route: 'settings', 
		search: { current: 'webhooks' }
	},
];

export { SITE_TOUR_STOPS, SITE_TOUR_STORAGE_KEY };
