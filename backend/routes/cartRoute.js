import express from 'express'
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from '../middleware/authMiddleware.js'
const cartRouter = express.Router()

// middleware
cartRouter.use(authMiddleware);

// Routes
cartRouter.post('/add', addToCart)
cartRouter.post('/remove', removeFromCart)
cartRouter.post('/get', getCart)

export default cartRouter
