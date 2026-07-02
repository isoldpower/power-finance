import type { FC } from "react";

const AssistantChatInput: FC = () => (
	<div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong py-1.5 pl-3 pr-1.5">
		<input
			placeholder="Ask about your plan…"
			className="min-w-0 flex-1 border-none bg-transparent text-[12.5px] outline-none placeholder:text-[var(--text-3)]"
		/>
		<button type="button" aria-label="Send" className="flex size-[30px] flex-none items-center justify-center rounded-[var(--radius-sm)] bg-[image:var(--accent-grad)] shadow-[0_3px_10px_var(--glow)]">
			<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
				<line x1="22" y1="2" x2="11" y2="13" />
				<polygon points="22 2 15 22 11 13 2 9 22 2" />
			</svg>
		</button>
	</div>
);

AssistantChatInput.displayName = 'AssistantChatInput';

export { AssistantChatInput };
