type FilterOperator =
	| 'eq'
	| 'neq'
	| 'gt'
	| 'gte'
	| 'lt'
	| 'lte'
	| 'in'
	| 'contains'
	| 'icontains';

type FilterValue = string | string[];

interface FilterLeaf<TField extends string = string> {
	field_name: TField;
	operator: FilterOperator;
	value: FilterValue;
}

interface FilterAndGroup<TField extends string = string> {
	and: FilterNode<TField>[];
}

interface FilterOrGroup<TField extends string = string> {
	or: FilterNode<TField>[];
}

type FilterGroup<TField extends string = string> = FilterAndGroup<TField> | FilterOrGroup<TField>;

type FilterNode<TField extends string = string> = FilterLeaf<TField> | FilterGroup<TField>;

interface SearchPayload<TField extends string = string> {
	filter_body: FilterNode<TField>;
}

type SearchOrder = 'ASC' | 'DESC';

interface FilterFieldOption<TField extends string = string> {
	field: TField;
	label: string;
	operators: FilterOperator[];
}

export type {
	FilterAndGroup,
	FilterFieldOption,
	FilterGroup,
	FilterLeaf,
	FilterNode,
	FilterOperator,
	FilterOrGroup,
	FilterValue,
	SearchOrder,
	SearchPayload,
};
