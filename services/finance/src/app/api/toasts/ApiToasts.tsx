import { ToastHost } from "@shared/overlays";
import { useApiToasts } from "./use-api-toasts.ts";

import type { FC } from "react";


const ApiToasts: FC = () => {
	useApiToasts();

	return (
		<ToastHost />
	);
};

ApiToasts.displayName = 'ApiToasts';

export { ApiToasts };
