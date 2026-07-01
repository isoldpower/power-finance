import type { Tone } from "@shared/utils";

interface MockAccount {
	id: string;
	name: string;
	kind: string;
	balanceUsd: number;
	balanceTone: Tone;
	accountType: string;
}

interface MockAccountCategory {
	id: string;
	label: string;
	color: string;
	totalUsd: number;
	accounts: MockAccount[];
}


export type { MockAccount, MockAccountCategory };
