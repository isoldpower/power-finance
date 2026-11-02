interface GuestDemoSessionDto {
	token: string;
	expires_at: string;
}

type GuestDemoReadinessMethod = 'GET' | 'POST';

interface GuestDemoReadinessProbeDto {
	path: string;
	method: GuestDemoReadinessMethod;
	body?: object;
}

export type { GuestDemoReadinessMethod, GuestDemoReadinessProbeDto, GuestDemoSessionDto };
