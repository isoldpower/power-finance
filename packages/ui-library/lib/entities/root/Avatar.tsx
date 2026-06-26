import { Avatar, AvatarImage, AvatarFallback } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiAvatar = forwardUi(Avatar, "UiAvatar");
export const UiAvatarImage = forwardUi(AvatarImage, "UiAvatarImage");
export const UiAvatarFallback = forwardUi(AvatarFallback, "UiAvatarFallback");