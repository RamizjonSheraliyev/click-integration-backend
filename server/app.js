require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { rateLimit } = require('express-rate-limit')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

// Middleware
app.use(rateLimit({ windowMs: 1 * 60 * 1000, limit: 200, standardHeaders: 'draft-7', legacyHeaders: false }))
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', require('./routes/index'))

// Error handling
app.use(errorMiddleware)

const bootstrap = async () => {
	try {
		const PORT = process.env.PORT || 5000
		mongoose.connect(process.env.MONOGO_URI).then(() => console.log('Connected to MongoDB'))
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	} catch (error) {
		console.log('Error connecting to MongoDB:', error)
	}
}

bootstrap()
