import { SidebarTrigger } from "@internal/ui-library";

const SidebarFloatingTrigger = () => {
	return (
		<div className="relative">
			<div className="absolute top-3 left-2 z-10 rounded bg-accent">
				<SidebarTrigger />
			</div>
		</div>
	)
}

export { SidebarFloatingTrigger };