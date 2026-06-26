import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiCard = forwardUi(Card, "UiCard");
export const UiCardHeader = forwardUi(CardHeader, "UiCardHeader");
export const UiCardFooter = forwardUi(CardFooter, "UiCardFooter");
export const UiCardTitle = forwardUi(CardTitle, "UiCardTitle");
export const UiCardDescription = forwardUi(CardDescription, "UiCardDescription");
export const UiCardContent = forwardUi(CardContent, "UiCardContent");
