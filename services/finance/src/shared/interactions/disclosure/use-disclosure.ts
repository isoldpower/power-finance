import { useState } from "react";


const useDisclosure = (initial = false) => {
	const [open, setOpen] = useState(initial);
	
	return {
		open,
		setOpen,
		onOpen: () => { setOpen(true); },
		onClose: () => { setOpen(false); },
	};
};

export { useDisclosure };
