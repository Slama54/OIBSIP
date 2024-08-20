import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { create, deletepizza, getpizzas, updatepizza } from '../controllers/pizza.controller.js'

 
const router = express.Router()
 router.post('/create',verifyToken, create)
 router.get('/getpizzas',getpizzas)
 router.delete('/deletepizza/:pizzaId/:userId', verifyToken, deletepizza)
 router.put('/updatepizza/:pizzaId/:userId',verifyToken, updatepizza)

 
 export default router;