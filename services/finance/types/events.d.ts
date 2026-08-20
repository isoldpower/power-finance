interface SlideOverEvent {
	panelId: string;
}

declare global {
	interface WindowEventMap {
		'slideoveropen': CustomEvent<SlideOverEvent>;
	}
}

export {};