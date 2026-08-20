import { Icons } from "@internal/ui-library";

import type { LucideIcon } from "lucide-react";


const GOAL_ICONS = {
	target: Icons.Target,
	safety: Icons.LifeBuoy,
	travel: Icons.Plane,
	home: Icons.House,
	car: Icons.Car,
	wedding: Icons.Gem,
	education: Icons.GraduationCap,
	vacation: Icons.Palmtree,
	cash: Icons.Banknote,
	invest: Icons.TrendingUp,
	savings: Icons.PiggyBank,
	gift: Icons.Gift,
	health: Icons.HeartPulse,
	family: Icons.Baby,
	tech: Icons.Laptop,
	hobby: Icons.Guitar,
} satisfies Record<string, LucideIcon>;

type GoalIconName = keyof typeof GOAL_ICONS;

const resolveGoalIcon = (icon: string): LucideIcon => {
	const registry: Record<string, LucideIcon | undefined> = GOAL_ICONS;

	return registry[icon] ?? GOAL_ICONS.target;
};

export { GOAL_ICONS, resolveGoalIcon };
export type { GoalIconName };
