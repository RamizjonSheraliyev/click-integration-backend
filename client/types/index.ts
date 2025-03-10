export type SearchParams = { [key: string]: string | string[] | undefined }
export type Params = { productId: string }

export interface ChildProps {
	children: React.ReactNode
}

export interface ReturnActionType {
	user: IUser
	failure: string
	status: number
	checkoutUrl: string
	isNext: boolean
	products: IProduct[]
	product: IProduct
	url: string
}

export interface IUser {
	email: string
	fullName: string
	_id: string
}

export interface IProduct {
	title: string
	category: string
	price: number
	image: string
	description: string
	imageKey: string
	_id: string
}

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}
