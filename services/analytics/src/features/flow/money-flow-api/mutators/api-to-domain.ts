import { moneyFromApi, optionalCategoryRefFromApi, walletRefFromApi } from "@feature/filters/ledger-api";

import type { FlowLink, FlowNode, MoneyFlow } from "@entity/flow";
import type { FlowLinkDto, FlowNodeDto, MoneyFlowDto } from "../types.ts";


const flowNodeFromApi = (dto: FlowNodeDto): FlowNode => ({
	id: dto.id,
	kind: dto.kind,
	label: dto.label,
	category: optionalCategoryRefFromApi(dto.category),
	wallet: dto.wallet === null ? null : walletRefFromApi(dto.wallet),
	amount: moneyFromApi(dto.amount),
});

const flowLinkFromApi = (dto: FlowLinkDto): FlowLink => ({
	source: dto.source,
	target: dto.target,
	amount: moneyFromApi(dto.amount),
});

const moneyFlowFromApi = (dto: MoneyFlowDto): MoneyFlow => ({
	nodes: dto.nodes.map(flowNodeFromApi),
	links: dto.links.map(flowLinkFromApi),
	totalInflow: moneyFromApi(dto.totals.inflow),
	totalOutflow: moneyFromApi(dto.totals.outflow),
});

export { flowLinkFromApi, flowNodeFromApi, moneyFlowFromApi };
