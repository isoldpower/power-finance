import type { ResolutionIntent } from "@entity/assistance";


type ResolutionVariant = 'primary' | 'outline' | 'ghost' | 'danger';

const RESOLUTION_VARIANT: Record<ResolutionIntent, ResolutionVariant> = {
	primary: 'primary',
	secondary: 'outline',
	danger: 'danger',
};

const MENU_RESOLUTION_VARIANT: Record<ResolutionIntent, ResolutionVariant> = {
	primary: 'ghost',
	secondary: 'ghost',
	danger: 'danger',
};

export { MENU_RESOLUTION_VARIANT, RESOLUTION_VARIANT };
export type { ResolutionVariant };
