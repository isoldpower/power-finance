import { useEffect, useMemo, useState } from "react";
import { useRoutePathname } from "../navigation";


interface AccountMenuDisclosure {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const useAccountMenuDisclosure = (): AccountMenuDisclosure => {
	const [open, setOpen] = useState(false);
	const pathname = useRoutePathname();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return useMemo(() => ({ open, setOpen }), [open]);
};

export { useAccountMenuDisclosure };
export type { AccountMenuDisclosure };
