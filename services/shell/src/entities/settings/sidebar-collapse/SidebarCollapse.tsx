import {FC} from "react";
import {useSettingsContext} from "@internal/shared";
import {PanelRightOpen} from "lucide-react";

type SidebarCollapseProps = {

}

const SidebarCollapse: FC<SidebarCollapseProps> = () => {
	const { sidebarOpen } = useSettingsContext();

	return sidebarOpen
		? <PanelRightOpen/>
		: <PanelRightOpen className="rotate-180" />
}

SidebarCollapse.displayName = 'SidebarCollapse';

export {SidebarCollapse};
export type {SidebarCollapseProps};

