import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { createVegetable, deletevegetable, getVegetables, updatevegetable } from '../controllers/vegetable.controller.js';


 
const router = express.Router()
 router.post('/createvegetable',verifyToken, createVegetable)
router.get('/getvegetables',getVegetables)
router.delete('/deletevegetable/:vegetableId/:userId', verifyToken, deletevegetable)
router.put('/updatevegetable/:vegetableId/:userId',verifyToken, updatevegetable)

 
 export default router;