import { ApiError } from "../envelope";

import type { FilterLeaf, FilterNode, FilterOperator } from "../filtration";


type FieldPolicy<TField extends string> = Record<TField, FilterOperator[]>;
type FieldResolver<TRecord, TField extends string> = (record: TRecord, field: TField) => string | null;

interface MatcherOptions<TField extends string> {
	numericFields?: TField[];
}


function scalarOf(leaf: FilterLeaf, field: string): string {
	if (Array.isArray(leaf.value)) {
		throw new ApiError(
			'validation_failed',
			'Filter value must be a scalar', 
			[{
				field: `filter_body.${field}`,
				code: 'filter_value_type',
				message: `${leaf.operator} expects a scalar`,
			}]
		);
	}

	return leaf.value;
}

const compare = (
	actualValue: string | null,
	compareLeaf: FilterLeaf,
	field: string,
	numeric: boolean,
): boolean => {
	if (compareLeaf.operator === 'in') {
		if (!Array.isArray(compareLeaf.value)) {
			throw new ApiError('validation_failed', 'Filter value must be an array', [{
				field: `filter_body.${field}`,
				code: 'filter_value_type',
				message: 'in expects an array of scalars',
			}]);
		}

		return actualValue !== null && compareLeaf.value.includes(actualValue);
	}

	const expectedValue = scalarOf(compareLeaf, field);
	if (actualValue === null) {
		return compareLeaf.operator === 'neq';
	}

	const leftValue: string | number = numeric ? Number.parseFloat(actualValue) : actualValue;
	const rightValue: string | number = numeric ? Number.parseFloat(expectedValue) : expectedValue;
	switch (compareLeaf.operator) {
		case 'eq':
			return leftValue === rightValue;
		case 'neq':
			return leftValue !== rightValue;
		case 'gt':
			return leftValue > rightValue;
		case 'gte':
			return leftValue >= rightValue;
		case 'lt':
			return leftValue < rightValue;
		case 'lte':
			return leftValue <= rightValue;
		case 'contains':
			return actualValue.includes(expectedValue);
		case 'icontains':
			return actualValue.toLowerCase().includes(expectedValue.toLowerCase());
	}
};

const assertLeaf = <TField extends string>(
	policy: FieldPolicy<TField>,
	leaf: FilterLeaf,
): FilterOperator[] => {
	const whitelist: Partial<Record<string, FilterOperator[]>> = policy;
	const allowed = whitelist[leaf.field_name];

	if (!allowed) {
		throw new ApiError('validation_failed', `Field ${leaf.field_name} is not filterable`, [{
			field: `filter_body.${leaf.field_name}`,
			code: 'filter_unknown_field',
			message: 'Field is not whitelisted for this resource',
		}]);
	} else if (!allowed.includes(leaf.operator)) {
		throw new ApiError('validation_failed', `Operator ${leaf.operator} is not allowed`, [{
			field: `filter_body.${leaf.field_name}`,
			code: 'filter_operator_not_allowed',
			message: `${leaf.operator} is not permitted on ${leaf.field_name}`,
		}]);
	}

	return allowed;
};

const validateFilter = <TField extends string>(
	policy: FieldPolicy<TField>,
	node: FilterNode,
): void => {
	if ('and' in node) {
		node.and.forEach((child) => {
			validateFilter(policy, child);
		});
	} else if ('or' in node) {
		node.or.forEach((child) => { 
			validateFilter(policy, child); 
		});
	} else {
		assertLeaf(policy, node);
	}
};

const createMatcher = <TRecord, TField extends string>(
	policy: FieldPolicy<TField>,
	resolve: FieldResolver<TRecord, TField>,
	options: MatcherOptions<TField> = {},
) => {
	const numericFields = new Set<string>(options.numericFields ?? []);

	const matches = (record: TRecord, node: FilterNode): boolean => {
		if ('and' in node) return node.and.every((child) => {
			return matches(record, child);
		});
		if ('or' in node) return node.or.some((child) => {
			return matches(record, child);
		});

		const leafNode = node;
		assertLeaf(policy, leafNode);

		return compare(
			resolve(record, leafNode.field_name as TField),
			leafNode,
			leafNode.field_name,
			numericFields.has(leafNode.field_name),
		);
	};

	return matches;
};

export { createMatcher, validateFilter };
export type { FieldPolicy, FieldResolver, MatcherOptions };
