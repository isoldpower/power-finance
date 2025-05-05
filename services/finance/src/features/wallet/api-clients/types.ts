interface WalletValuableFields {
	name: string
	currency: string
	balance: number
	reversed: boolean
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
	reversed: boolean
	meta: WalletMeta
}

interface WalletPreview {
	id: string
	name: string
	balance: number
	currency: string
	reversed: boolean
}

type WalletMinimalPayload = WalletValuableFields;

export type { WalletPreview, WalletDetailed, WalletMeta, WalletValuableFields, WalletMinimalPayload };