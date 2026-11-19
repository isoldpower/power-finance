import type { LedgerWallet } from "../types.ts";


const EVERYDAY = 'w_everyday';
const SAVINGS = 'w_savings';
const TRAVEL = 'w_travel';
const CASH = 'w_cash';

const SEED_WALLETS: LedgerWallet[] = [
	{ id: EVERYDAY, name: 'Everyday', color: '#4f46e5', currency: 'USD', openingBalance: 2400, favorite: true },
	{ id: SAVINGS, name: 'Savings', color: '#1baf7a', currency: 'USD', openingBalance: 9800, favorite: true },
	{ id: TRAVEL, name: 'Travel card', color: '#eb6834', currency: 'EUR', openingBalance: 650, favorite: false },
	{ id: CASH, name: 'Cash', color: '#eda100', currency: 'USD', openingBalance: 180, favorite: false },
];

export { CASH, EVERYDAY, SAVINGS, SEED_WALLETS, TRAVEL };
