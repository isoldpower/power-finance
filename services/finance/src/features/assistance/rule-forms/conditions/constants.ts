import type { RuleConditionSchema } from "../schema";
import type { ConditionLevel } from "./types.ts";


const CONDITION_LEVELS: ConditionLevel[] = ['eventCategory', 'event', 'field', 'operator', 'value'];

const FALLBACK_FIELD = 'name';
const FALLBACK_OPERATOR: RuleConditionSchema['operator'] = 'eq';

export { CONDITION_LEVELS, FALLBACK_FIELD, FALLBACK_OPERATOR };
