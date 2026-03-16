import { z } from "zod";

const webhookSchema = z.object({
	title: z.string().min(1, "Enter a title for a webhook"),
	url: z.string()
		.min(1, "Enter a url for a webhook")
		.url("Your url should be in a URL format"),
});

type WebhookSchema = z.infer<typeof webhookSchema>;

export { webhookSchema };
export type { WebhookSchema };