const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')
const router = require('express').Router()

router.get('/profile/:id', userController.getProfile)
router.get('/products', userController.getProducts)
router.get('/product/:id', userController.getProduct)
router.get('/transactions', userMiddleware, userController.getTransactions)
router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router
