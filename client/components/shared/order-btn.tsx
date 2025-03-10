'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import useAction from '@/hooks/use-action'
import { clickCheckout } from '@/actions/user.action'
import { useParams } from 'next/navigation'
import { Loader } from 'lucide-react'

const OrderBtn = () => {
	const { isLoading, onError, setIsLoading } = useAction()
	const { productId } = useParams<{ productId: string }>()

	const onClick = async () => {
		setIsLoading(true)
		const res = await clickCheckout({ id: productId })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.url) {
			window.open(res.data.url, '_self')
		}
	}

	return (
		<Button variant={'secondary'} className='w-fit font-bold' onClick={onClick} disabled={isLoading}>
			<span>Purchase by</span>
			<Image src={'/click.svg'} alt='click' width={50} height={50} />
			{isLoading && <Loader className='animate-spin' />}
		</Button>
	)
}

export default OrderBtn
