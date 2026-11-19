import type { GuestDemoSession } from "../types.ts";
import type { GuestDemoSessionDto } from "./types.ts";


const guestDemoSessionFromApi = (dto: GuestDemoSessionDto, writeVersion: string | null): GuestDemoSession => ({
	token: dto.token,
	expiresAt: dto.expires_at,
	writeVersion: writeVersion === '' ? null : writeVersion,
});

export { guestDemoSessionFromApi };
