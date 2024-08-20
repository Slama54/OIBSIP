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

export const getpizzas = async (req, res , next)=>{
    try {
      const startIndex = parseInt(req.query.startIndex)||0;
      const limit = parseInt(req.query.limit)||6;
      const sortDirection = req.query.order === 'asc' ? 1 :-1;
      const pizzas = await Pizza.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.priceS && {priceS:req.query.priceS}),
        ...(req.query.priceM && {priceM:req.query.priceM}),
        ...(req.query.priceL && {priceL:req.query.priceL}),
        
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.pizzaId && {_id:req.query.pizzaId}),
        ...(req.query.searchTerm && {
          $or:[
            { title: { $regex: req.query.searchTerm,$options: 'i'}},
            { content: { $regex: req.query.searchTerm,$options: 'i'}},
          ],
        }),
  
      }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
        
      const totalPizzas = await Pizza.countDocuments()
      const now = new Date()
      const oneMonthAgo =new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
      const lastMonthPizzas = await Pizza.countDocuments({
        createdAt :{ $gte :oneMonthAgo},
  
      })
       res.status(200).json({
        pizzas,
        totalPizzas,
        lastMonthPizzas,
       })
  
    } catch (error) {
      next(error)
    }
  };
  export const deletepizza = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can delete pizza'));
    }
    try {
        await Pizza.findByIdAndDelete(req.params.pizzaId)
        res.status(200).json('Pizza has been deleted')
    } catch (error) {
        next(error);
        
    }

  }
  export const updatepizza = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can update pizza'));
    }
    try {
      const updatePizza = await Pizza.findByIdAndUpdate(req.params.pizzaId, {
        $set:{
          title: req.body.title,
          content: req.body.content,
          priceS: req.body.priceS,
          priceM: req.body.priceM,
          priceL: req.body.priceL,
          image: req.body.image,
        }
      },{new:true})
      res.status(200).json(updatePizza)
    } catch (error) {
      next(error)
    }

  }