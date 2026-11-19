import { delay } from "@internal/shared";
import {
	analyticsMeta,
	categoryKeyOf,
	convertRow,
	MockLedger,
	moneyDto,
	parseLedgerQuery,
	selectFlows,
	walletRefDto,
} from "@feature/filters/ledger-api";

import type { LedgerQuery, LedgerRow, LedgerWallet } from "@feature/filters/ledger-api";
import type { FlowLinkDto, FlowNodeDto, FlowNodeKindDto } from "../types.ts";
import type { IMoneyFlowRESTApiClient, MoneyFlowRequest, MoneyFlowResponse } from "./types.ts";


const SAVINGS_NODE = 'savings';
const RESERVES_NODE = 'reserves';
const UNCATEGORIZED_LABEL = 'Uncategorized';

interface RawLink {
	source: string;
	target: string;
	amount: number;
}

const walletLinks = (wallet: LedgerWallet, rows: LedgerRow[], currency: string): RawLink[] => {
	const walletNode = `wallet:${wallet.id}`;
	const totals = new Map<string, RawLink>();
	let inflow = 0;
	let outflow = 0;

	rows.filter((row) => row.walletId === wallet.id).forEach((row) => {
		const amount = convertRow(row, currency);
		const isIncome = row.side === 'income';
		const categoryNode = `${isIncome ? 'income' : 'expense'}:${categoryKeyOf(row.category)}`;
		const link = totals.get(categoryNode) ?? {
			source: isIncome ? categoryNode : walletNode,
			target: isIncome ? walletNode : categoryNode,
			amount: 0,
		};

		link.amount += amount;
		totals.set(categoryNode, link);
		if (isIncome) {
			inflow += amount;
		}
		else {
			outflow += amount;
		}
	});

	const balanceLink: RawLink[] = inflow > outflow
		? [{ source: walletNode, target: SAVINGS_NODE, amount: inflow - outflow }]
		: [{ source: RESERVES_NODE, target: walletNode, amount: outflow - inflow }];

	return [...totals.values(), ...balanceLink].filter((link) => link.amount >= 0.01);
};

const nodeKind = (id: string): FlowNodeKindDto => {
	if (id === SAVINGS_NODE) {
		return 'savings';
	}
	if (id === RESERVES_NODE) {
		return 'reserves';
	}
	if (id.startsWith('wallet:')) {
		return 'wallet';
	}

	return id.startsWith('income:') ? 'income_category' : 'expense_category';
};

const buildNode = (ledger: MockLedger, id: string, links: RawLink[], query: LedgerQuery): FlowNodeDto => {
	const kind = nodeKind(id);
	const incoming = links.filter((link) => link.target === id).reduce((sum, link) => sum + link.amount, 0);
	const outgoing = links.filter((link) => link.source === id).reduce((sum, link) => sum + link.amount, 0);
	const wallet = kind === 'wallet' ? ledger.wallet(id.slice('wallet:'.length)) ?? null : null;
	const categoryId = kind === 'income_category' || kind === 'expense_category' ? id.slice(id.indexOf(':') + 1) : null;
	const category = categoryId === null ? null : ledger.category(categoryId) ?? null;
	const labels: Record<FlowNodeKindDto, string> = {
		savings: 'Saved',
		reserves: 'From balance',
		wallet: wallet?.name ?? 'Wallet',
		income_category: category?.name ?? UNCATEGORIZED_LABEL,
		expense_category: category?.name ?? UNCATEGORIZED_LABEL,
	};

	return {
		id,
		kind,
		label: labels[kind],
		category,
		wallet: wallet ? walletRefDto(wallet) : null,
		amount: moneyDto(Math.max(incoming, outgoing), query.currency),
	};
};

class MoneyFlowMockRESTApiClient implements IMoneyFlowRESTApiClient {
	public async getMoneyFlow(payload: MoneyFlowRequest): Promise<MoneyFlowResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const rows = selectFlows(ledger, query);
		const wallets = ledger.wallets().filter((wallet) => rows.some((row) => row.walletId === wallet.id));
		const links = wallets.flatMap((wallet) => walletLinks(wallet, rows, query.currency));
		const nodeIds = [...new Set(links.flatMap((link) => [link.source, link.target]))];
		const flowLinks: FlowLinkDto[] = links
			.sort((left, right) => right.amount - left.amount)
			.map((link) => ({ source: link.source, target: link.target, amount: moneyDto(link.amount, query.currency) }));
		const sumSide = (side: LedgerRow['side']): number => rows
			.filter((row) => row.side === side)
			.reduce((sum, row) => sum + convertRow(row, query.currency), 0);

		return {
			data: {
				nodes: nodeIds.map((id) => buildNode(ledger, id, links, query)),
				links: flowLinks,
				totals: {
					inflow: moneyDto(sumSide('income'), query.currency),
					outflow: moneyDto(sumSide('expense'), query.currency),
				},
			},
			meta: analyticsMeta(query),
		};
	}
}

export { MoneyFlowMockRESTApiClient };
