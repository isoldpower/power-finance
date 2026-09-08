import { v4 as uuidv4 } from "uuid";


function createIdempotencyKey(): string {
	return uuidv4();
}

export { createIdempotencyKey };
