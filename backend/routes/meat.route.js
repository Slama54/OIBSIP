import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { createMeat, deletemeat, getMeats, updatemeat } from '../controllers/meat.controller.js';


 
const router = express.Router()
 router.post('/createmeat',verifyToken, createMeat)
router.get('/getmeats',getMeats)
router.delete('/deletemeat/:meatId/:userId', verifyToken, deletemeat)
router.put('/updatemeat/:meatId/:userId',verifyToken, updatemeat)

 
 export default router;