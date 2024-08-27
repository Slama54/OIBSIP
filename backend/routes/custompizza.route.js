import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { createCustomPizza } from '../controllers/custompizza.controller.js'

 
const router = express.Router()
 router.post('/createcustompizza',verifyToken, createCustomPizza)
//  router.get('/getpizzas',getpizzas)
//  router.delete('/deletepizza/:pizzaId/:userId', verifyToken, deletepizza)
//  router.put('/updatepizza/:pizzaId/:userId',verifyToken, updatepizza)

 
 export default router;