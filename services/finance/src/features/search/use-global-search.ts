import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// Owns the global search interaction: ⌘K / Escape shortcuts, open + query state, and
// committing a selection by navigating to the chosen route.
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
			if (event.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', onKeyDown);
		return () => { window.removeEventListener('keydown', onKeyDown); };
	}, []);

	const select = (to: string) => {
		setOpen(false);
		setQuery('');
		inputRef.current?.blur();
		void navigate({ to });
	};

	return { query, setQuery, open, setOpen, inputRef, select };
};

export { useGlobalSearch };
