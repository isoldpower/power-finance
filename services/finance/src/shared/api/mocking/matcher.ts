import { ApiError } from "../envelope";

import type { FilterLeaf, FilterNode, FilterOperator } from "../filtration";


type FieldPolicy<TField extends string> = Record<TField, FilterOperator[]>;

type FieldResolver<TRecord, TField extends string> = (record: TRecord, field: TField) => string | null;

interface MatcherOptions<TField extends string> {
	numericFields?: TField[];
}

const scalarOf = (leaf: FilterLeaf, field: string): string => {
	if (Array.isArray(leaf.value)) {
		throw new ApiError('validation_failed', 'Filter value must be a scalar', [
			{ field: `filter_body.${field}`, code: 'filter_value_type', message: `${leaf.operator} expects a scalar` },
		]);
	}

	return leaf.value;
};

const compare = (
	actual: string | null,
	leaf: FilterLeaf,
	field: string,
	numeric: boolean,
): boolean => {
	if (leaf.operator === 'in') {
		if (!Array.isArray(leaf.value)) {
			throw new ApiError('validation_failed', 'Filter value must be an array', [{
				field: `filter_body.${field}`,
				code: 'filter_value_type',
				message: 'in expects an array of scalars',
			}]);
		}

		return actual !== null && leaf.value.includes(actual);
	}

	const expected = scalarOf(leaf, field);
	if (actual === null) {
		return leaf.operator === 'neq';
	}

	const left: string | number = numeric ? Number.parseFloat(actual) : actual;
	const right: string | number = numeric ? Number.parseFloat(expected) : expected;

	switch (leaf.operator) {
		case 'eq':
			return left === right;
		case 'neq':
			return left !== right;
		case 'gt':
			return left > right;
		case 'gte':
			return left >= right;
		case 'lt':
			return left < right;
		case 'lte':
			return left <= right;
		case 'contains':
			return actual.includes(expected);
		case 'icontains':
			return actual.toLowerCase().includes(expected.toLowerCase());
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

const validateFilter = <TField extends string>(policy: FieldPolicy<TField>, node: FilterNode): void => {
	if ('and' in node) {
		node.and.forEach((child) => { validateFilter(policy, child); });

		return;
	}

	if ('or' in node) {
		node.or.forEach((child) => { validateFilter(policy, child); });

		return;
	}

	assertLeaf(policy, node);
};

const createMatcher = <TRecord, TField extends string>(
	policy: FieldPolicy<TField>,
	resolve: FieldResolver<TRecord, TField>,
	options: MatcherOptions<TField> = {},
) => {
	const numericFields = new Set<string>(options.numericFields ?? []);

	const matches = (record: TRecord, node: FilterNode): boolean => {
		if ('and' in node) return node.and.every((child) => matches(record, child));
		if ('or' in node) return node.or.some((child) => matches(record, child));

		const leaf = node;
		assertLeaf(policy, leaf);

		return compare(
			resolve(record, leaf.field_name as TField),
			leaf,
			leaf.field_name,
			numericFields.has(leaf.field_name),
		);
	};

	return matches;
};

export { createMatcher, validateFilter };
export type { FieldPolicy, FieldResolver, MatcherOptions };
