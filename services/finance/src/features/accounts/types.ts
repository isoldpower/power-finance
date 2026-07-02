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
	totalUsd: number;
	accounts: MockAccount[];
}

interface AccountHistoryEntry {
	id: string;
	icon: string;
	iconClass: string;
	description: string;
	date: string;
	side: string;
	sideTone: Tone;
	amountUsd: number;
	amountTone: Tone;
}


export type { MockAccount, MockAccountCategory, AccountHistoryEntry };
