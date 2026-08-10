import { AssistantOverlayRoot } from "./AssistantOverlayRoot.tsx";
import { AssistantScrim } from "./AssistantScrim.tsx";
import { AssistantSheet } from "./AssistantSheet.tsx";
import { AssistantFab } from "./AssistantFab.tsx";


function AssistantOverlay() {
	return null;
}

AssistantOverlay.displayName = 'AssistantOverlay';
AssistantOverlay.Root = AssistantOverlayRoot;
AssistantOverlay.Scrim = AssistantScrim;
AssistantOverlay.Sheet = AssistantSheet;
AssistantOverlay.Fab = AssistantFab;

export { AssistantOverlay };
