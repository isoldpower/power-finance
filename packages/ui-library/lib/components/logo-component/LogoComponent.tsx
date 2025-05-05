import type { FC } from "react";

import { logoAsset } from "@/assets";

interface LogoComponentProps {
	withText?: boolean;
}

const LogoComponent: FC<LogoComponentProps> = ({ withText }) => {
  return (
	<div className='flex items-center gap-4'>
	  <img
			alt="Company logo"
			className='w-6 h-6'
			src={logoAsset} />
		{withText && (
			<span>Company</span>
		)}
	</div>
  )
}

LogoComponent.displayName = 'LogoWithText';

export { LogoComponent };
export type { LogoComponentProps };