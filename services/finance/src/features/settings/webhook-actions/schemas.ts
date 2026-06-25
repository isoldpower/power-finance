import { z } from "zod";

const webhookSchema = z.object({
	title: z.string().min(1, "Enter a title for a webhook"),
	url: z.string()
		.min(1, "Enter a url for a webhook")
		.url("Your url should be in a URL format"),
});
const deleteWebhookSchema = z.object({
	id: z.string().min(1, "Missing webhook ID"),
});

type WebhookSchema = z.infer<typeof webhookSchema>;
type DeletedWebhookSchema = z.infer<typeof deleteWebhookSchema>;

export { webhookSchema, deleteWebhookSchema };
export type { WebhookSchema, DeletedWebhookSchema };