import { z } from "zod";

const searchSchema = z.object({
});

type ManagementSearch = z.infer<typeof searchSchema>;

export { searchSchema };
export type { ManagementSearch };
