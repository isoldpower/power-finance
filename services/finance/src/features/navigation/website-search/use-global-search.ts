import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";


const useGlobalSearch = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setOpen((value) => !value);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => { window.removeEventListener('keydown', onKeyDown); };
	}, []);

	const select = useCallback((to: string) => {
		setOpen(false);
		void navigate({ to });
	}, [navigate]);

	const onOpen = useCallback(() => { setOpen(true); }, []);

	return useMemo(() => ({
		open,
		setOpen,
		onOpen,
		select,
	}), [open, onOpen, select]);
};

export { useGlobalSearch };
