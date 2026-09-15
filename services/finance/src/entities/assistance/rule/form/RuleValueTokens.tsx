import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleValueTokensProps {
	tokens: SelectOption[];
	disabled?: boolean;
	onRemove: (value: string) => void;
}

const RuleValueTokens: FC<RuleValueTokensProps> = ({ tokens, disabled, onRemove }) => {
	if (tokens.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-1">
			{tokens.map((token) => (
				<button
					key={token.value}
					type="button"
					disabled={disabled}
					title={`Remove ${token.label}`}
					onClick={() => { onRemove(token.value); }}
					className={cn(
						textClass({ size: '11', weight: 'semibold' }),
						"flex items-center gap-1 rounded-full border border-[var(--accent-border)]",
						"bg-[var(--accent-soft)] px-2 py-0.5 text-primary",
						"disabled:opacity-50"
					)}
				>
					<span className="max-w-32 truncate">{token.label}</span>
					<span aria-hidden>✕</span>
				</button>
			))}
		</div>
	);
};

RuleValueTokens.displayName = 'RuleValueTokens';

export { RuleValueTokens };
export type { RuleValueTokensProps };
