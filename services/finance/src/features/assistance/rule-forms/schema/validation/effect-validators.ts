import { compareAmounts, ZERO_AMOUNT } from "@shared/api";
import { parseAmountDecimal } from "@shared/formatting";

import { CURRENCY_CODE_PATTERN } from "../constants.ts";
import { requiredText } from "./required-text.ts";

import type { RuleEffectType, RuleFormValues } from "../fields.ts";
import type { RuleFormIssue, RuleFormValidator } from "./types.ts";


function transferWalletIssues(values: RuleFormValues): RuleFormIssue[] {
	const issues = [
		...requiredText(values, 'fromWalletId', 'Pick a source wallet'),
		...requiredText(values, 'toWalletId', 'Pick a target wallet'),
	];

	if (values.fromWalletId !== '' && values.fromWalletId === values.toWalletId) {
		issues.push({ field: 'toWalletId', message: 'A transfer needs two different wallets' });
	}

	return issues;
}

function transferMoneyIssues(values: RuleFormValues): RuleFormIssue[] {
	const issues: RuleFormIssue[] = [];

	if (compareAmounts(parseAmountDecimal(values.amount), ZERO_AMOUNT) <= 0) {
		issues.push({ field: 'amount', message: 'Enter an amount above zero' });
	}

	if (!CURRENCY_CODE_PATTERN.test(values.currency.trim())) {
		issues.push({ field: 'currency', message: 'Pick a currency' });
	}

	return issues;
}

const setCategoryEffect: RuleFormValidator = {
	issues(values): RuleFormIssue[] {
		const issues: RuleFormIssue[] = [];

		if (values.triggerType !== 'event') {
			issues.push({
				field: 'effectType',
				message: 'Categorising applies to transaction triggers only',
			});
		}

		return [...issues, ...requiredText(values, 'category', 'Enter a category')];
	},
};

const notifyEffect: RuleFormValidator = {
	issues(values): RuleFormIssue[] {
		return requiredText(values, 'title', 'Enter a title');
	},
};

const raiseActionEffect: RuleFormValidator = {
	issues(values): RuleFormIssue[] {
		return [
			...requiredText(values, 'title', 'Enter a title'),
			...requiredText(values, 'body', 'Enter a body'),
		];
	},
};

const transferEffect: RuleFormValidator = {
	issues(values): RuleFormIssue[] {
		return [...transferWalletIssues(values), ...transferMoneyIssues(values)];
	},
};

const EFFECT_VALIDATORS: Record<RuleEffectType, RuleFormValidator> = {
	set_category: setCategoryEffect,
	notify: notifyEffect,
	raise_action: raiseActionEffect,
	transfer: transferEffect,
};

export { EFFECT_VALIDATORS };
