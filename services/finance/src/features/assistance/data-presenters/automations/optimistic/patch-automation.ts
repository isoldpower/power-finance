import type { Automation, AutomationPatch } from "@entity/assistance";


const patchAutomation = (automation: Automation, patch: AutomationPatch): Automation => ({
	...automation,
	name: patch.name ?? automation.name,
	icon: patch.icon ?? automation.icon,
	enabled: patch.enabled ?? automation.enabled,
	trigger: patch.trigger ?? automation.trigger,
	effects: patch.effects ?? automation.effects,
});

export { patchAutomation };
