import express from 'express'
import {verifyToken} from'../utils/verifyuser.js'
import {createComment, getPizzaComments} from '../controllers/comment.controller.js'
const router = express.Router()
router.post('/create', verifyToken,createComment)
router.get('/getPizzaComments/:pizzaId', getPizzaComments)


export default router;