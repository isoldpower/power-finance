import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { UiSidebarTrigger } from "@internal/ui-library";


const SidebarFloatingTrigger: FC = () => {
	const triggerRef = useRef<HTMLDivElement | null>(null);
	const [offset, setOffset] = useState<number>(0);

	useEffect(() => {
		if (!triggerRef.current) return;

		const { inlineSize, marginLeft, marginRight } = getComputedStyle(triggerRef.current);
		setOffset(parseFloat(inlineSize) + parseFloat(marginLeft) + parseFloat(marginRight));
	}, []);

	return (
		<div className="relative" style={{ marginRight: `-${offset.toString()}px` }}>
			<div ref={triggerRef} className="sticky top-3 ml-2 z-10 rounded bg-accent">
				<UiSidebarTrigger />
			</div>
		</div>
	);
};

SidebarFloatingTrigger.displayName = 'SidebarFloatingTrigger';

export { SidebarFloatingTrigger };
