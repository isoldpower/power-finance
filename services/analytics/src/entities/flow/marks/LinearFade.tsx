import { LinearGradient } from "@visx/gradient";

import type { FC } from "react";


interface LinearFadeProps {
	id: string;
	color: string;
	opacity?: number;
}

const LinearFade: FC<LinearFadeProps> = ({ id, color, opacity = 0.24 }) => (
	<LinearGradient id={id} from={color} to={color} fromOpacity={opacity} toOpacity={0} />
);

LinearFade.displayName = 'LinearFade';

export { LinearFade };
export type { LinearFadeProps };
