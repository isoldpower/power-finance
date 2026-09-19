import { useCallback } from "react";
import { FinanceButton, FinanceInput, financeInputVariants, Icons, PasswordInput } from "@internal/ui-library";
import { WebhookSecretList } from "@entity/configuration";
import { notify } from "@shared/overlays";

import type { FC } from "react";
import type { WebhookEndpointSecret } from "@entity/configuration";


interface WebhookSecretPanelProps {
	webhook: WebhookEndpointSecret;
}

const WebhookSecretPanel: FC<WebhookSecretPanelProps> = ({ webhook }) => {
	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(webhook.secret).then(
			() => { notify.success('Signing secret copied'); },
			() => { notify.error("Couldn't copy the secret"); },
		);
	}, [webhook.secret]);

	return (
		<WebhookSecretList>
			<WebhookSecretList.Notice>
				This secret signs every payload. Copy it now — it cannot be shown again, only rotated.
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
