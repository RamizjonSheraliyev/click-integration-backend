'use client'

import { IUser } from '@/types'
import { signOut } from 'next-auth/react'
import { FC } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import Link from 'next/link'
import { LogIn } from 'lucide-react'

interface Props {
	user: IUser
}
const UserBox: FC<Props> = ({ user }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarFallback className='capitalize bg-primary text-white'>{user.fullName.charAt(0)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer' asChild>
					<Link href={'/dashboard'}>Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer' onClick={() => signOut({ callbackUrl: '/sign-in' })}>
					<LogIn />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox
