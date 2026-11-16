import type { LaidOutLink, PositionedLink, PositionedNode } from "../../types.ts";


type LinkEndpoint = LaidOutLink['source'];

const endpointId = (endpoint: LinkEndpoint): string => {
	if (typeof endpoint === 'object') {
		return endpoint.id;
	}

	return endpoint.toString();
};

const nodeById = (nodes: ReadonlyMap<string, PositionedNode>, id: string): PositionedNode => {
	const node = nodes.get(id);

	if (!node) {
		throw new Error(`Sankey node ${id} is missing from the layout`);
	}

	return node;
};

const positionLink = (link: LaidOutLink, nodes: ReadonlyMap<string, PositionedNode>): PositionedLink => {
	const source = nodeById(nodes, endpointId(link.source));
	const target = nodeById(nodes, endpointId(link.target));

	return {
		key: `${source.id}->${target.id}`,
		source,
		target,
		sourceX: source.x + source.width,
		sourceY: link.y0 ?? 0,
		targetX: target.x,
		targetY: link.y1 ?? 0,
		width: link.width ?? 1,
		value: link.value,
	};
};

export { positionLink };
