import { AssistantPanelHeader } from "./AssistantPanelHeader.tsx";
import { AssistantPanelBody } from "./AssistantPanelBody.tsx";
import { AssistantSignalsSection } from "./AssistantSignalsSection.tsx";
import { AssistantSectionLabel } from "./AssistantSectionLabel.tsx";
import { AssistantSignalsGrid } from "./AssistantSignalsGrid.tsx";
import { AssistantSignalTile } from "./AssistantSignalTile.tsx";
import { AssistantChatFeed } from "./AssistantChatFeed.tsx";
import { AssistantChatBubble } from "./AssistantChatBubble.tsx";
import { AssistantComposer } from "./AssistantComposer.tsx";
import { AssistantPromptsRow } from "./AssistantPromptsRow.tsx";
import { AssistantPromptChip } from "./AssistantPromptChip.tsx";
import { AssistantChatInput } from "./AssistantChatInput.tsx";
import { AssistantComingSoonOverlay } from "./AssistantComingSoonOverlay.tsx";


function AssistantPanel() {
	return null;
}

AssistantPanel.displayName = 'AssistantPanel';
AssistantPanel.Header = AssistantPanelHeader;
AssistantPanel.Body = AssistantPanelBody;
AssistantPanel.Signals = AssistantSignalsSection;
AssistantPanel.SectionLabel = AssistantSectionLabel;
AssistantPanel.SignalsGrid = AssistantSignalsGrid;
AssistantPanel.SignalTile = AssistantSignalTile;
AssistantPanel.Chat = AssistantChatFeed;
AssistantPanel.Bubble = AssistantChatBubble;
AssistantPanel.Composer = AssistantComposer;
AssistantPanel.Prompts = AssistantPromptsRow;
AssistantPanel.PromptChip = AssistantPromptChip;
AssistantPanel.Input = AssistantChatInput;
AssistantPanel.ComingSoon = AssistantComingSoonOverlay;

export { AssistantPanel };
