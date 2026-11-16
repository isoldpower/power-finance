import { isApiError } from "@internal/shared";

import type { UseFormSetError } from "react-hook-form";
import type { CategoryNameSchema } from "../schemas.ts";


const NAME_CONFLICT_MESSAGE = 'A category with this name already exists';

const reportNameConflict = (error: unknown, setError: UseFormSetError<CategoryNameSchema>): void => {
	if (isApiError(error) && error.code === 'conflict') {
		setError('name', { 
			type: 'conflict',
			message: NAME_CONFLICT_MESSAGE 
		});
	}
};

export { reportNameConflict };
