interface WalletValuableFields {
	name: string
	currency: string
	balance: number
}

interface WalletMeta {
	createdAt: string
	updatedAt: string
	id: string
}

interface WalletDetailed {
	id: string
	name: string
	balance: number
	currency: string
	meta: WalletMeta
}

interface WalletPreview {
	id: string
	name: string
	balance: number
	currency: string
}

type WalletMinimalPayload = WalletValuableFields;

export type { WalletPreview, WalletDetailed, WalletMeta, WalletValuableFields, WalletMinimalPayload };