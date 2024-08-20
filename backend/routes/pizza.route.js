import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { create, deletepizza, getpizzas } from '../controllers/pizza.controller.js'
 
const router = express.Router()
 router.post('/create',verifyToken, create)
 router.get('/getpizzas',getpizzas)
 router.delete('/deletepizza/:pizzaId/:userId', verifyToken, deletepizza)

 
 export default router;