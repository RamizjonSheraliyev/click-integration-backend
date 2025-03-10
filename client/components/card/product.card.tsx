import { IProduct } from '@/types'
import Image from 'next/image'
import { FC } from 'react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface Props {
	product: IProduct
}
const ProductCard: FC<Props> = ({ product }) => {
	return (
		<Link href={`/product/${product._id}`}>
			<div className='bg-secondary relative '>
				<Image src={product.image!} width={300} height={300} className='mx-auto' alt={product.title!} />
			</div>
			<div className='flex justify-between items-center mt-2 text-sm'>
				<h1 className='font-bold line-clamp-1'>{product.title}</h1>
				<p className='font-medium'>{formatPrice(product.price!)}</p>
			</div>
			<p className='text-xs text-muted-foreground'>{product.category}</p>
		</Link>
	)
}

export default ProductCard
