import type { RhythmBin } from "@entity/spending";


interface HoveredRhythmCell {
	weekday: number;
	hour: number;
	bin: RhythmBin;
}

export type { HoveredRhythmCell };
