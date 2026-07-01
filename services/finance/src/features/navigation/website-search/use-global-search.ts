import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";


const useGlobalSearch = () => {
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setOpen(true);
				inputRef.current?.focus();
			}
			
			if (event.key === 'Escape') {
				setOpen(false);
			}
		};
		
		window.addEventListener('keydown', onKeyDown);
		return () => { window.removeEventListener('keydown', onKeyDown); };
	}, []);

	const select = useCallback((to: string) => {
		setOpen(false);
		setQuery('');
		
		inputRef.current?.blur();
		void navigate({ to });
	}, [navigate]);

	return useMemo(() => ({ 
		query,
		setQuery,
		open,
		setOpen,
		inputRef,
		select,
	}), [open, query, select]);
};

export { useGlobalSearch };
