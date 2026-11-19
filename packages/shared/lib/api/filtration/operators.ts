import type { FilterOperator } from "./types.ts";


const TEXT_OPERATORS: FilterOperator[] = ['eq', 'neq', 'in', 'contains', 'icontains'];

const REFERENCE_OPERATORS: FilterOperator[] = ['eq', 'neq', 'in'];

const NUMERIC_OPERATORS: FilterOperator[] = ['eq', 'gt', 'gte', 'lt', 'lte'];

const DATE_OPERATORS: FilterOperator[] = ['gt', 'gte', 'lt', 'lte'];

const BOOLEAN_OPERATORS: FilterOperator[] = ['eq'];

export { BOOLEAN_OPERATORS, DATE_OPERATORS, NUMERIC_OPERATORS, REFERENCE_OPERATORS, TEXT_OPERATORS };
