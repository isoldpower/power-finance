import type { FC } from "react";

import { logoAsset } from "@/assets";

interface LogoComponentProps {
	withText?: boolean;
}

const LogoComponent: FC<LogoComponentProps> = ({ withText }) => {
  return (
	<div className='flex items-center gap-4'>
	  <img
			alt="Power Finance logo"
			className='w-6 h-6'
			src={logoAsset} />
		{withText && (
			<span>Power Finance</span>
		)}
	</div>
  )
}

LogoComponent.displayName = 'LogoComponent';

export { LogoComponent };
export type { LogoComponentProps };