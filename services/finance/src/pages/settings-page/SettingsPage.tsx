import {FC, useCallback} from 'react';

import {Button, Tabs, TabsContent, TabsList, TabsTrigger} from "@internal/ui-library";
import { PreferencesModalBox } from "@entity/preferences";
import { GlobalLocaleSelection, PreferredCurrencySelection } from "@widget/preferences";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewWebhook } from "@feature/webhook/webhook-actions/NewWebhook.tsx";
import {webhookSchema, WebhookSchema} from "@feature/webhook/webhook-actions/schemas.ts";
import {useNewDefaultValues} from "@feature/webhook/webhook-actions/useSchemasDefaults.ts";
import {useWebhooksList} from "@feature/webhook";


const SettingsPage: FC = () => {
	// TODO: Webhooks UI, Creation process, better FSD, settings tab persistence through URL params
	const { webhooks } = useWebhooksList();
	
	const defaults = useNewDefaultValues()
	const form = useForm<WebhookSchema>({
		resolver: zodResolver(webhookSchema),
		defaultValues: defaults
	});
	
	const onWebhookCreated = useCallback(() => {
		console.log('created!');
	}, []);
	
	return (
		<Tabs 
			orientation="vertical" 
			defaultValue="preferences"
		>
			<TabsList className="py-4! gap-2! min-h-[calc(100dvh-54px)] w-[240px] flex! flex-col! justify-start">
				<TabsTrigger className="flex-0" value="preferences">
					Preferences
				</TabsTrigger>
				<TabsTrigger className="flex-0" value="webhooks">
					Webhooks
				</TabsTrigger>
			</TabsList>
			<div className="p-6">
				<TabsContent value="preferences">
					<PreferencesModalBox>
						<PreferredCurrencySelection />
						<GlobalLocaleSelection />
					</PreferencesModalBox>
				</TabsContent>
				<TabsContent value="webhooks">
					{webhooks.map((hook, index) => (
						<div key={index}>
							{hook.title} - {hook.url}
						</div>
					))}
					<NewWebhook handleSubmit={form.handleSubmit} onSuccess={onWebhookCreated}>
						<Button type='submit'>
							Create Webhook
						</Button>
					</NewWebhook>
				</TabsContent>
			</div>
		</Tabs>
	);
};

export { SettingsPage };
export default SettingsPage;