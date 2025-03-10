'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import { idSchema, loginSchema, registerSchema, searchParamsSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'

export const login = actionClient.schema(loginSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const { data } = await axiosClient.post('/api/user/login', parsedInput)
	return JSON.parse(JSON.stringify(data))
})

export const register = actionClient.schema(registerSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const { data } = await axiosClient.post('/api/user/register', parsedInput)
	return JSON.parse(JSON.stringify(data))
})

export const clickCheckout = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session) return { failure: 'You need to be logged in to make a purchase' }
	const token = await generateToken(session.currentUser?._id)
	const { data } = await axiosClient.post(
		'/api/click/checkout',
		{ productId: parsedInput.id },
		{ headers: { Authorization: `Bearer ${token}` } }
	)
	return JSON.parse(JSON.stringify(data))
})

export const getProducts = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const { data } = await axiosClient.get('/api/user/products', {
		params: parsedInput,
	})
	return JSON.parse(JSON.stringify(data))
})

export const getProduct = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const { data } = await axiosClient.get(`/api/user/product/${parsedInput.id}`)
	return JSON.parse(JSON.stringify(data))
})
