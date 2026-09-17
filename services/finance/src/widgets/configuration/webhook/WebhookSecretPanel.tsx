import { useCallback } from "react";
import { FinanceButton, FinanceInput, financeInputVariants, Icons, PasswordInput } from "@internal/ui-library";
import { WebhookSecretList } from "@entity/configuration";
import { notify } from "@shared/overlays";

import { SECRET_COPIED, SECRET_COPY_FAILED, SECRET_NOTICE } from "./config.ts";

import type { FC } from "react";
import type { WebhookEndpointSecret } from "@entity/configuration";


interface WebhookSecretPanelProps {
	webhook: WebhookEndpointSecret;
}

const WebhookSecretPanel: FC<WebhookSecretPanelProps> = ({ webhook }) => {
	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(webhook.secret).then(
			() => { notify.success(SECRET_COPIED); },
			() => { notify.error(SECRET_COPY_FAILED); },
		);
	}, [webhook.secret]);

	return (
		<WebhookSecretList>
			<WebhookSecretList.Notice>
				{SECRET_NOTICE}
			</WebhookSecretList.Notice>
			<WebhookSecretList.Row label="Webhook ID">
				<FinanceInput readOnly value={webhook.id} />
			</WebhookSecretList.Row>
			<WebhookSecretList.Row label="Endpoint URL">
				<FinanceInput readOnly value={webhook.url} />
			</WebhookSecretList.Row>
			<WebhookSecretList.Row label="Signing secret">
				<PasswordInput
					enableButton={true}
					readOnly
					value={webhook.secret}
					className={financeInputVariants()}
				/>
				<FinanceButton
					type="button"
					variant="secondary"
					size="sm"
					className="self-start"
					onClick={handleCopy}
				>
					<Icons.Copy size={14} />
					Copy secret
				</FinanceButton>
			</WebhookSecretList.Row>
		</WebhookSecretList>
	);
};

WebhookSecretPanel.displayName = 'WebhookSecretPanel';

export { WebhookSecretPanel };
export type { WebhookSecretPanelProps };
