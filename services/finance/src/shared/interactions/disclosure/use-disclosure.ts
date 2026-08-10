import { useCallback, useState } from "react";


const useDisclosure = (initial = false) => {
	const [open, setOpen] = useState(initial);
	
	const handleOnOpen = useCallback(() => {
		setOpen(true);
	}, []);
	const handleOnClose = useCallback(() => {
		setOpen(false);
	}, []);
	
	return {
		open,
		setOpen,
		onOpen: handleOnOpen,
		onClose: handleOnClose,
	};
};

export { useDisclosure };
