import express from 'express'

import { addToCart, deleteUser, getCart, getUser, getUsers, removeFromCart, signout, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.get('/test',test);
router.put('/update/:userId', verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser)
router.put('/add/:userId' , verifyToken,addToCart )
router.put('/removefromcart/:userId' , verifyToken,removeFromCart )

router.get('/getcart/:userId', verifyToken, getCart);


export default router