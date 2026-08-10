import {
	FinanceMenu,
	FinanceMenuContent,
	FinanceMenuTrigger,
} from "@internal/ui-library";

import { GoalForm } from "@entity/wallets";
import { useDisclosure } from "@shared/interactions";

import { EMOJI_OPTIONS } from "../config.ts";

import type { FC } from "react";


interface GoalEmojiPickerProps {
	value: string;
	onChange: (emoji: string) => void;
}

const GoalEmojiPicker: FC<GoalEmojiPickerProps> = ({ value, onChange }) => {
	const { open, setOpen, onClose } = useDisclosure();

	return (
		<FinanceMenu open={open} onOpenChange={setOpen}>
			<FinanceMenuTrigger asChild>
				<GoalForm.EmojiTrigger aria-label="Choose icon">
					{value || '🎯'}
				</GoalForm.EmojiTrigger>
			</FinanceMenuTrigger>
			<FinanceMenuContent align="start" className="p-2">
				<GoalForm.EmojiGrid>
					{EMOJI_OPTIONS.map((emoji) => (
						<GoalForm.EmojiOption
							key={emoji}
							selected={value === emoji}
							onClick={() => { onChange(emoji); onClose(); }}
						>
							{emoji}
						</GoalForm.EmojiOption>
					))}
				</GoalForm.EmojiGrid>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

GoalEmojiPicker.displayName = 'GoalEmojiPicker';

export { GoalEmojiPicker };
export type { GoalEmojiPickerProps };
