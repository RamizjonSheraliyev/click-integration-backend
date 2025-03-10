import './globals.css'

import { Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next'
import SessionProvider from '@/components/providers/session.provider'
import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/toaster'

const spaceGrotesk = Space_Grotesk({
	weight: ['400', '500', '600', '700', '300'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Click',
	description: 'Click integration NodeJS',
	icons: { icon: '/click.svg' },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SessionProvider>
			<html lang='en'>
				<body className={`${spaceGrotesk.className}  antialiased`}>
					<Navbar />
					<main className='container max-w-6xl mt-24'>{children}</main>
					<Toaster />
				</body>
			</html>
		</SessionProvider>
	)
}
