const customerModel = require('../models/customer.model')
const productModel = require('../models/product.model')
const bcrypt = require('bcrypt')
const transactionModel = require('../models/transaction.model')

class AuthController {
	// [GET] /user/profile/:id
	async getProfile(req, res, next) {
		try {
			const user = await customerModel.findById(req.params.id).select('-password')
			return res.json({ user })
		} catch (error) {
			console.log(error)
			next(error)
		}
	}
	// [GET] /user/products
	async getProducts(req, res, next) {
		try {
			const { searchQuery, filter, category, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				query.$or = [{ title: { $regex: new RegExp(escapedSearchQuery, 'i') } }]
			}

			if (category === 'All') query.category = { $exists: true }
			else if (category !== 'All') {
				if (category) query.category = category
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const products = await productModel.find(query).sort(sortOptions).skip(skipAmount).limit(+pageSize)

			const totalProducts = await productModel.countDocuments(query)
			const isNext = totalProducts > skipAmount + +products.length

			return res.json({ products, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/product/:id
	async getProduct(req, res, next) {
		try {
			const product = await productModel.findById(req.params.id)
			return res.json({ product })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/transactions
	async getTransactions(req, res, next) {
		try {
			const userId = req.user._id
			const transactions = await transactionModel.find({ user: userId }).populate({ path: 'product' })
			return res.json({ transactions })
		} catch (error) {
			next(error)
		}
	}
	// [POST] /user/login
	async login(req, res, next) {
		try {
			const { email, password } = req.body

			const user = await customerModel.findOne({ email })
			if (!user) return res.json({ failure: 'User not found' })

			const isValidPassword = await bcrypt.compare(password, user.password)
			if (!isValidPassword) return res.json({ failure: 'Password is incorrect' })

			return res.json({ user })
		} catch (error) {
			next(error)
		}
	}
	// [POST] /user/register
	async register(req, res, next) {
		try {
			const { email, password, fullName } = req.body

			const user = await customerModel.findOne({ email })
			if (user) return res.json({ failure: 'User already exists' })

			const hashedPassword = await bcrypt.hash(password, 10)
			const newUser = await customerModel.create({ email, password: hashedPassword, fullName })

			return res.json({ user: newUser })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AuthController()
