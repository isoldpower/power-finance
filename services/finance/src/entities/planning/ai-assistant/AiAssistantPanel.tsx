import type { FC } from "react";
import { cn } from "@internal/ui-library";
import type { Tone } from "@shared/utils";

import { SparkleIcon } from "../SparkleIcon.tsx";

interface AssistantSignal {
	label: string;
	value: string;
	tone: Tone;
}

interface AssistantMessage {
	id: string;
	role: 'assistant' | 'user';
	text: string;
	refs?: string[];
}

interface AiAssistantPanelProps {
	signals: AssistantSignal[];
	chat: AssistantMessage[];
	prompts: string[];
	onClose?: () => void;
	className?: string;
	comingSoon?: boolean;
}

const toneClass: Record<Tone, string> = {
	pos: 'text-pos',
	neg: 'text-neg',
	neutral: 'text-foreground',
	muted: 'text-text-2',
};

const AiAssistantPanel: FC<AiAssistantPanelProps> = ({ signals, chat, prompts, onClose, className, comingSoon = false }) => {
	return (
		<div className={cn("relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-lg)]", className)}>
			{comingSoon ? (
				<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-card/30 backdrop-blur-[3px]">
					<span className="flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-1.5 text-[13px] font-semibold text-primary shadow-[var(--shadow)]">
						<SparkleIcon size={14} accent />
						Coming soon
					</span>
					<span className="text-[11.5px] text-text-2">AI assistant is on the way</span>
				</div>
			) : null}
			<div aria-hidden={comingSoon} className={cn("flex flex-1 flex-col", comingSoon && "pointer-events-none select-none")}>
			<div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
				<div className="flex size-7 flex-none items-center justify-center rounded-[8px] bg-[image:var(--accent-grad)] shadow-[0_2px_8px_var(--glow)]">
					<SparkleIcon size={15} />
				</div>
				<div className="flex-1">
					<div className="text-sm font-semibold">AI assistant</div>
					<div className="font-numeric text-[9.5px] text-text-3">grounded in your data</div>
				</div>
				<span className="size-2 flex-none rounded-full bg-pos" />
				{onClose ? (
					<button type="button" onClick={onClose} className="flex size-7 flex-none items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-text-2 hover:bg-secondary lg:hidden">✕</button>
				) : null}
			</div>

			<div className="border-b border-border bg-secondary px-3.5 py-2.5">
				<div className="mb-2 font-numeric text-[9.5px] tracking-[0.1em] text-text-3">SIGNALS</div>
				<div className="grid grid-cols-2 gap-2">
					{signals.map((signal) => (
						<div key={signal.label} className="rounded-[var(--radius-md)] border border-border bg-card px-2.5 py-2">
							<div className="text-[10px] text-text-3">{signal.label}</div>
							<div className={cn("font-display text-[15px] font-semibold", toneClass[signal.tone])}>{signal.value}</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex max-h-[340px] flex-col gap-3 overflow-y-auto p-3.5">
				{chat.map((message) => (
					<div key={message.id} className={cn("flex", message.role === 'user' ? "justify-end" : "justify-start")}>
						<div
							className={cn(
								"max-w-[85%] rounded-[var(--radius-md)] px-3 py-2",
								message.role === 'user'
									? "bg-[image:var(--accent-grad)] text-white"
									: "border border-border bg-secondary text-foreground"
							)}
						>
							<div className="text-[12.5px] leading-relaxed">{message.text}</div>
							{message.refs ? (
								<div className="mt-2 flex flex-wrap gap-1.5">
									{message.refs.map((ref) => (
										<span
											key={ref}
											className={cn(
												"rounded-full border px-2 py-0.5 font-numeric text-[9.5px] font-semibold",
												message.role === 'user'
													? "border-white/30 text-white"
													: "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary"
											)}
										>
											{ref}
										</span>
									))}
								</div>
							) : null}
						</div>
					</div>
				))}
			</div>

			<div className="mt-auto border-t border-border px-3.5 py-2.5">
				<div className="mb-2.5 flex flex-wrap gap-1.5">
					{prompts.map((prompt) => (
						<button key={prompt} type="button" className="rounded-full border border-border-strong px-2.5 py-1 text-[11px] font-semibold text-text-2 hover:border-primary hover:text-primary">
							{prompt}
						</button>
					))}
				</div>
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
			</div>
			</div>
		</div>
	);
};

AiAssistantPanel.displayName = 'AiAssistantPanel';

export { AiAssistantPanel };
export type { AiAssistantPanelProps };
