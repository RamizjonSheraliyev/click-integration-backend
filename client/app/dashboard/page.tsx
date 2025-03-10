import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

const Page = () => {
	return (
		<div className='container max-w-4xl'>
			<Table>
				<TableCaption>A list of your recent transactions.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'></TableHead>
						<TableHead>Product</TableHead>
						<TableHead>Provider</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className='font-medium'>
							<Image
								src={'https://utfs.io/f/mMbSyFqocdYGRRC6rcosDBObvq34UpLtEhcgTHuCWkrQRlwX'}
								alt='product'
								width={50}
								height={50}
							/>
						</TableCell>
						<TableCell>Adidas</TableCell>
						<TableCell>click</TableCell>
						<TableCell>Paid</TableCell>
						<TableCell className='text-right'>{formatPrice(1000)}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

export default Page
