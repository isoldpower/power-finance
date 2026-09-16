import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";
import { SendIcon } from "@shared/pure-components/icons";

import type { ChangeEvent, FC, FormEvent } from "react";


interface AssistantChatInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	disabled?: boolean;
	placeholder?: string;
}

const AssistantChatInput: FC<AssistantChatInputProps> = ({
	value,
	onChange,
	onSubmit,
	disabled = false,
	placeholder = 'Ask about your plan…',
}) => {
	const sendable = !disabled && value.trim() !== '';

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (!sendable) return;

		onSubmit();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn(
				"flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong",
				"py-1.5 pl-3 pr-1.5 focus-within:border-primary"
			)}
		>
			<input
				value={value}
				onChange={handleChange}
				disabled={disabled}
				placeholder={placeholder}
				className={cn(
					textClass({ size: '12.5' }),
					"min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-[var(--text-3)]",
					"disabled:cursor-not-allowed"
				)}
			/>
			<button
				type="submit"
				aria-label="Send"
				disabled={!sendable}
				className={cn(
					"flex size-[30px] flex-none items-center justify-center rounded-[var(--radius-sm)]",
					"bg-[image:var(--accent-grad)] shadow-[0_3px_10px_var(--glow)]",
					"transition-opacity disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
				)}
			>
				<SendIcon size={15} className="text-white" />
			</button>
		</form>
	);
};

AssistantChatInput.displayName = 'AssistantChatInput';

export { AssistantChatInput };
export type { AssistantChatInputProps };
