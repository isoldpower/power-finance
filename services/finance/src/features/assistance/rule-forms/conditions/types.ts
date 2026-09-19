type ConditionKey = 'field' | 'operator' | 'value';
type ConditionPath = `conditions.${number}.${ConditionKey}`;
type ConditionLevel = 'eventCategory' | 'event' | 'field' | 'operator' | 'value';

export type { ConditionKey, ConditionLevel, ConditionPath };
