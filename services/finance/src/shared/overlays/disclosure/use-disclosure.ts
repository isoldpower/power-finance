import { useCallback, useState } from "react";


const useDisclosure = (initial = false) => {
	const [open, setOpen] = useState(initial);
	
	const handleOnOpen = useCallback(() => {
		setOpen(true);
	}, []);
	const handleOnClose = useCallback(() => {
		setOpen(false);
	}, []);
	const handleOnToggle = useCallback(() => {
		setOpen((current) => !current);
	}, []);
	
	return {
		open,
		setOpen,
		onOpen: handleOnOpen,
		onClose: handleOnClose,
		onToggle: handleOnToggle,
	};
};

export { useDisclosure };
