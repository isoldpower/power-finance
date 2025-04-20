import type {FC, HTMLProps, ReactElement} from "react";
import {cloneElement} from "react";

import {useCallback, useMemo} from "react";
import {useSettingsContext} from "@internal/shared";
import {useIsMobile} from "@shared/lib";

interface SwitchSidebarProps {
	children: ReactElement<{ onClick: () => void }, any>;
}

const SwitchSidebar: FC<SwitchSidebarProps> = ({ children }) => {
	const settings = useSettingsContext();
	const isMobile = useIsMobile();

	const relatedField = isMobile ? 'mobileSidebarOpen' : 'sidebarOpen';
	const isExpanded = useMemo(() => {
		return settings[relatedField];
	}, [relatedField, settings[relatedField]]);

	const handleToggle = useCallback(() => {
		settings.onUpdateField(relatedField, !isExpanded);
	}, [settings.onUpdateField, relatedField, isExpanded]);

	return cloneElement(children, {
		...children.props as HTMLProps<unknown>,
		onClick: handleToggle
	});
}

SwitchSidebar.displayName = 'SwitchSidebar';

export { SwitchSidebar };
export type { SwitchSidebarProps };