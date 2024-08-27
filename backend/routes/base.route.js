import express from 'express'
import{verifyToken} from '../utils/verifyUser.js'
import { createBase, deletebase, getBases, updatebase } from '../controllers/base.controller.js';


 
const router = express.Router()
 router.post('/createbase',verifyToken, createBase)
router.get('/getbases',getBases)
router.delete('/deletebase/:baseId/:userId', verifyToken, deletebase)
router.put('/updatebase/:baseId/:userId',verifyToken, updatebase)

 
 export default router;