import type { FlowNode } from "@entity/flow";
import type { PositionedLink } from "../../layout";


const linkCategoryEnd = (link: PositionedLink): FlowNode => {
	const fromWallet = link.source.node.kind === 'wallet';

	return fromWallet ? link.target.node : link.source.node;
};

export { linkCategoryEnd };
