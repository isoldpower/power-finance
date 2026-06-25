interface WalletValuableFields {
	name: string
	balance: {
		amount: number
		currency: string
	}
	credit: boolean
}

interface WalletMeta {
	created_at: string
	updated_at: string
	id: string
}

interface WalletDetailed {
	id: string
	name: string
	balance: {
		amount: number
		currency: string
	}
	credit: boolean
	meta: WalletMeta
}

interface WalletPreview {
	id: string
	name: string
	balance: {
		amount: number
		currency: string
	}
	credit: boolean
}

type WalletMinimalPayload = WalletValuableFields;

export type { WalletPreview, WalletDetailed, WalletMeta, WalletValuableFields, WalletMinimalPayload };