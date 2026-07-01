interface FlatDeleteResponse {
	message: string
	id: string | null
}

const deleteToFlat = (response: { message: string; meta: { id: string | null } }): FlatDeleteResponse => ({
	message: response.message,
	id: response.meta.id
});

export { deleteToFlat };
