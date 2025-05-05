import type {FC} from "react";
import classes from './Form.module.css';
import logoUrl from '@shared/assets/logo.svg';

interface FormLogoProps {
}

const FormLogo: FC<FormLogoProps> = () => {
	return (
		<img src={logoUrl} alt="Logo" className={`${classes.recoveryForm__logo} w-12 h-6`} />
	);
};

FormLogo.displayName = 'FormLogo';

export { FormLogo };
export type { FormLogoProps };