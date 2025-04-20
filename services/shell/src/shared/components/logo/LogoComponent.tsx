import type {FC} from "react";
import Logo from "@shared/assets/logo.svg";

interface LogoComponentProps {
	withText?: boolean;
}

const LogoComponent: FC<LogoComponentProps> = ({ withText }) => {
  return (
	<div className='flex items-center gap-2'>
	  <img
		className='w-8 h-8'
		src={Logo}/>
		{withText && (
			<span>Company</span>
		)}
	</div>
  )
}

LogoComponent.displayName = 'LogoWithText';

export { LogoComponent };
export type { LogoComponentProps };