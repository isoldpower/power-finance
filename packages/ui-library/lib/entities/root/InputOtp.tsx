import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiInputOTP = forwardUi(InputOTP, "UiInputOTP");
export const UiInputOTPGroup = forwardUi(InputOTPGroup, "UiInputOTPGroup");
export const UiInputOTPSlot = forwardUi(InputOTPSlot, "UiInputOTPSlot");
export const UiInputOTPSeparator = forwardUi(InputOTPSeparator, "UiInputOTPSeparator");
