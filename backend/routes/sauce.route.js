import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { createSauce, deletesauce, getSauces, updatesauce } from '../controllers/sauce.controller.js';


 
const router = express.Router()
 router.post('/createsauce',verifyToken, createSauce)
router.get('/getsauces',getSauces)
router.delete('/deletesauce/:sauceId/:userId', verifyToken, deletesauce)
router.put('/updatesauce/:sauceId/:userId',verifyToken, updatesauce)

 
 export default router;