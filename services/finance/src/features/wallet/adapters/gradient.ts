import type { Wallet } from "@entity/wallet";

const GRADIENTS = [
	'linear-gradient(135deg,#4f46e5,#8b5cf6)',
	'linear-gradient(135deg,#0ca678,#1098ad)',
	'linear-gradient(135deg,#e8920c,#f76707)',
	'linear-gradient(135deg,#8b5cf6,#6366f1)',
	'linear-gradient(135deg,#1098ad,#0ca678)',
];

const hashString = (value: string): number => {
	let hash = 0;
	for (let index = 0; index < value.length; index += 1) {
		hash = (hash * 31 + value.charCodeAt(index)) | 0;
	}
	return Math.abs(hash);
};

// Deterministic card gradient derived from a wallet id, so a wallet always renders the same colour.
const gradientFromId = (id: string): string => GRADIENTS[hashString(id) % GRADIENTS.length];

const walletTypeLabel = (wallet: Wallet): string => (wallet.credit ? 'Credit card' : 'Account');

export { gradientFromId, walletTypeLabel };
