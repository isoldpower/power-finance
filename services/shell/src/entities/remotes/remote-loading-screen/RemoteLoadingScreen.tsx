import { LogoComponent } from "@internal/ui-library";

import type { FC } from "react";


interface RemoteLoadingScreenProps {
	title: string;
	caption?: string;
}

const APPEAR_STYLE = { animationDelay: '150ms' };

const RemoteLoadingScreen: FC<RemoteLoadingScreenProps> = ({ title, caption = 'Preparing your workspace' }) => (
	<div
		role="status"
		aria-live="polite"
		className="finance-theme flex min-h-screen w-full items-center justify-center bg-background text-foreground"
	>
		<div className="fx-fade flex flex-col items-center gap-4" style={APPEAR_STYLE}>
			<span className="relative flex size-14 items-center justify-center">
				<span aria-hidden className="absolute inset-0 rounded-full border-2 border-border" />
				<span
					aria-hidden
					className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary"
				/>
				<LogoComponent withText={false} />
			</span>
			<div className="flex flex-col items-center gap-1 text-center">
				<span className="text-[14px] font-semibold">
					{`Loading ${title}`}
				</span>
				<span className="text-[12.5px] text-text-3">
					{caption}
				</span>
			</div>
		</div>
	</div>
);

RemoteLoadingScreen.displayName = 'RemoteLoadingScreen';

export { RemoteLoadingScreen };
export type { RemoteLoadingScreenProps };
