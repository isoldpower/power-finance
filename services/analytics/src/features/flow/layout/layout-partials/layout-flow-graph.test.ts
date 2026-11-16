import { describe, expect, test } from 'vitest';

import { layoutFlowGraph } from './layout-flow-graph.ts';

import type { FlowGraph, FlowNode } from '@entity/flow';


const EXTENT = { width: 600, height: 300, labelRoom: 100 };

const flowNode = (id: string, kind: FlowNode['kind']): FlowNode => ({
	id,
	kind,
	label: id,
	category: null,
	wallet: null,
	amount: { amount: '0', currency: 'USD' },
});

const GRAPH: FlowGraph = {
	nodes: [
		{ id: 'salary', node: flowNode('salary', 'income_category') },
		{ id: 'wallet', node: flowNode('wallet', 'wallet') },
		{ id: 'food', node: flowNode('food', 'expense_category') },
		{ id: 'rent', node: flowNode('rent', 'expense_category') },
	],
	links: [
		{ source: 'salary', target: 'wallet', value: 100 },
		{ source: 'wallet', target: 'food', value: 40 },
		{ source: 'wallet', target: 'rent', value: 60 },
	],
};

describe('layoutFlowGraph', () => {
	test('returns an empty layout when there are no links', () => {
		expect(layoutFlowGraph({ nodes: GRAPH.nodes, links: [] }, EXTENT)).toEqual({ nodes: [], links: [] });
	});

	test('assigns columns by depth', () => {
		const { nodes } = layoutFlowGraph(GRAPH, EXTENT);
		const columns = Object.fromEntries(nodes.map((node) => [node.id, node.column]));

		expect(columns).toEqual({ salary: 'left', wallet: 'middle', food: 'right', rent: 'right' });
	});

	test('keeps nodes inside the extent minus the label room', () => {
		const { nodes } = layoutFlowGraph(GRAPH, EXTENT);

		nodes.forEach((node) => {
			expect(node.x).toBeGreaterThanOrEqual(EXTENT.labelRoom);
			expect(node.x + node.width).toBeLessThanOrEqual(EXTENT.width - EXTENT.labelRoom);
		});
	});

	test('connects links to their positioned endpoints', () => {
		const { links } = layoutFlowGraph(GRAPH, EXTENT);
		const rent = links.find((link) => link.key === 'wallet->rent');

		if (!rent) {
			throw new Error('wallet->rent link is missing');
		}

		const sourceRightEdge = rent.source.x + rent.source.width;

		expect(rent.value).toBe(60);
		expect(rent.sourceX).toBe(sourceRightEdge);
		expect(rent.targetX).toBe(rent.target.x);
	});
});
