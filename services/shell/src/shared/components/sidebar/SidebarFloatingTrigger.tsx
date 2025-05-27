import { SidebarTrigger } from "@internal/ui-library";
import { useEffect, useRef, useState } from "react";

const SidebarFloatingTrigger = () => {
	const triggerRef = useRef<HTMLDivElement | null>(null);
	const [offset, setOffset] = useState<number>(0);

	useEffect(() => {
		if (!triggerRef.current) return;

		const stylesheet = getComputedStyle(triggerRef.current);
		setOffset(parseInt(stylesheet.blockSize, 10) + parseInt(stylesheet.marginLeft) + parseInt(stylesheet.marginRight));
		console.log(stylesheet.blockSize, stylesheet.marginLeft, stylesheet.marginRight, stylesheet.blockSize + stylesheet.marginLeft + stylesheet.marginRight)
	}, []);

	return (
		<div className="relative" style={{ marginRight: `calc(-1 * ${offset.toString()}px)` }}>
			<div ref={triggerRef} className="sticky top-3 ml-2 z-10 rounded bg-accent">
				<SidebarTrigger />
			</div>
		</div>
	)
}

export { SidebarFloatingTrigger };