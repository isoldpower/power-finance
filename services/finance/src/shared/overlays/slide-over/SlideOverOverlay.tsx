import type {FC} from "react";
import { useSlideOverContext } from "./context/use-context-value.ts";


const SlideOverOverlay: FC = () => {
	const context = useSlideOverContext();
	
	return (
		<div onClick={context.onClose} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" />
	);
}

export { SlideOverOverlay };
