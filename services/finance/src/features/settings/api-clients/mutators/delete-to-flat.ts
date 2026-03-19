import { DeleteResponse } from "@internal/shared";

interface FlatDeleteResponse {
	message: string
	id: string
	success: boolean
}

const deleteToFlat = (response: DeleteResponse): FlatDeleteResponse => ({
	message: response.message,
	success: response.meta.success,
	id: response.meta.id
});

export { deleteToFlat };