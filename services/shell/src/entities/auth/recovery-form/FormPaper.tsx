import type {FC, ReactNode} from "react";
import classes from './Form.module.css';

interface FormPaperProps {
	children?: ReactNode;
}

const FormPaper: FC<FormPaperProps> = ({ children }) => {
	return (
		<div className={`${classes.recoveryForm__container}`}>
			<div className={`${classes.recoveryForm__paper}`}>
				{ children }
			</div>
		</div>
	);
};

FormPaper.displayName = 'FormPaper';

export { FormPaper };
export type { FormPaperProps };