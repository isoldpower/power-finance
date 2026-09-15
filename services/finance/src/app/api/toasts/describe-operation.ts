import { OPERATION_OVERRIDES } from "./operation-overrides.ts";
import { OPERATION_VERBS, READ_VERB } from "./operation-verbs.ts";

import type { OperationVerb } from "./operation-verbs.ts";


interface ApiOperationMessages {
	pending: string;
	success: string;
	error: string;
}

const FALLBACK_SUBJECT = 'data';

const toWords = (key: string): string[] => key
	.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
	.replace(/[-_]+/g, ' ')
	.toLowerCase()
	.split(' ')
	.filter(Boolean);

const capitalize = (phrase: string): string => phrase.charAt(0).toUpperCase() + phrase.slice(1);

const resolveVerb = (name: string | undefined): OperationVerb =>
	(name === undefined ? undefined : OPERATION_VERBS[name]) ?? READ_VERB;

const describeApiOperation = (key: string): ApiOperationMessages => {
	const override = OPERATION_OVERRIDES[key] ?? {};
	const words = toWords(key);
	const hasLeadingVerb = words.length > 1 && words[0] in OPERATION_VERBS;

	const verb = resolveVerb(override.verb ?? (hasLeadingVerb ? words[0] : undefined));
	const derivedSubject = (hasLeadingVerb ? words.slice(1) : words).join(' ');
	const subject = override.subject ?? (derivedSubject === '' ? FALLBACK_SUBJECT : derivedSubject);

	return {
		pending: `${verb.gerund} ${subject}…`,
		success: capitalize(`${subject} ${verb.past}`),
		error: `Couldn't ${verb.base} ${subject}`,
	};
};

export { describeApiOperation };
export type { ApiOperationMessages };
