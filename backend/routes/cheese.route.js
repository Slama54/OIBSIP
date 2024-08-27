import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { createCheese, deletecheese, getCheeses, updatecheese } from '../controllers/cheese.controller.js';


 
const router = express.Router()
 router.post('/createcheese',verifyToken, createCheese)
router.get('/getcheeses',getCheeses)
router.delete('/deletecheese/:cheeseId/:userId', verifyToken, deletecheese)
router.put('/updatecheese/:cheeseId/:userId',verifyToken, updatecheese)

 
 export default router;