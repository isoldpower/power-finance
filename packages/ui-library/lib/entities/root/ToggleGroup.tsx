import {
	ToggleGroup,
	ToggleGroupItem,
	type ToggleGroupSingleProps,
	type ToggleGroupMultipleProps,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiToggleGroup = forwardUi(ToggleGroup, "UiToggleGroup");
export const UiToggleGroupItem = forwardUi(ToggleGroupItem, "UiToggleGroupItem");
export type { ToggleGroupSingleProps as UiToggleGroupSingleProps, ToggleGroupMultipleProps as UiToggleGroupMultipleProps };
