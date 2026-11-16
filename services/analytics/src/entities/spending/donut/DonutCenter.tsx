import { DonutCenterCaption } from "./center/DonutCenterCaption.tsx";
import { DonutCenterLabel } from "./center/DonutCenterLabel.tsx";
import { DonutCenterValue } from "./center/DonutCenterValue.tsx";

import type { FC, PropsWithChildren } from "react";
import type { DonutCenterCaptionProps } from "./center/DonutCenterCaption.tsx";
import type { DonutCenterLabelProps } from "./center/DonutCenterLabel.tsx";
import type { DonutCenterValueProps } from "./center/DonutCenterValue.tsx";


type DonutCenterProps = PropsWithChildren;
type DonutCenterObject = FC<DonutCenterProps> & {
	Caption: FC<DonutCenterCaptionProps>;
	Label: FC<DonutCenterLabelProps>;
	Value: FC<DonutCenterValueProps>;
};

const DonutCenter: DonutCenterObject = ({ children }) => (
	<g pointerEvents="none" textAnchor="middle">
		{children}
	</g>
);

DonutCenter.Caption = DonutCenterCaption;
DonutCenter.Label = DonutCenterLabel;
DonutCenter.Value = DonutCenterValue;
DonutCenter.displayName = 'DonutCenter';

export { DonutCenter };
export type { DonutCenterProps };
