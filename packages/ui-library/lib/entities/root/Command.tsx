import {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiCommand = forwardUi(Command, "UiCommand");
export const UiCommandDialog = forwardUi(CommandDialog, "UiCommandDialog");
export const UiCommandInput = forwardUi(CommandInput, "UiCommandInput");
export const UiCommandList = forwardUi(CommandList, "UiCommandList");
export const UiCommandEmpty = forwardUi(CommandEmpty, "UiCommandEmpty");
export const UiCommandGroup = forwardUi(CommandGroup, "UiCommandGroup");
export const UiCommandItem = forwardUi(CommandItem, "UiCommandItem");
export const UiCommandShortcut = forwardUi(CommandShortcut, "UiCommandShortcut");
export const UiCommandSeparator = forwardUi(CommandSeparator, "UiCommandSeparator");