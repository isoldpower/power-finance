import { useState } from "react";

// Open/close state for overlays (slide-overs, modals). Returns stable-enough handlers plus the
// raw setter for callers that need to compose close with side effects (e.g. resetting a form).
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
