import Pizza from "../models/pizza.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next)=>{
    console.log(req.user);
    
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can create pizza'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Title and content are required'));
    }
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
        
    const newPizza = new Pizza({
        ...req.body,
        slug,
        userId: req.user.id
    })
    try {
        const savedPizza = await newPizza.save()
        res.status(201).json(savedPizza)
    } catch (error) {
        next(error);
        
    }

}

export const getpizzas = async(req, res , next )=>{
    try {
        const startIndex = parseInt(req.query.startIndex)||0;
        const limit = parseInt(req.query.limit)||6;
        const sortDirection = req.query.order ==='asc'?1:-1;
        const pizzas = await Pizza.find({
            ...Pizza(req.query.userId &&{userId:req.query.userId}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                  { title: { $regex: req.query.searchTerm,$options: 'i'}},
                  { content: { $regex: req.query.searchTerm,$options: 'i'}},
                ],
              }),

        }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
        const totalPizzas = await postMessage.countDocuments()
        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )
        const lastMonthPizzas = await Pizza.countDocuments({
            createdAt: {$gte: oneMonthAgo}
        })
        res.json({
            pizzas,
            totalPizzas,
            lastMonthPizzas
        })
    } catch (error) {
        next(error)
    }
}