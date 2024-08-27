import Cheese from "../models/cheese.model.js";
import { errorHandler } from "../utils/error.js";

export const createCheese = async (req, res, next)=>{
    console.log(req.user);
    
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can create pizza'));
    }
    if (!req.body.name || !req.body.price) {
        return next(errorHandler(400, 'Title and content are required'));
    }
    if (req.body.price <= 0) {
        return next(errorHandler(400, 'Price must be a positive number'));
    }
    if (req.body.price === Number) {
        return next(errorHandler(400, 'Price must be a  number'));
    }
    if (req.body.stock <= 0) {
        return next(errorHandler(400, 'stock must be a positive number'));
    }
    if (req.body.stock === Number) {
        return next(errorHandler(400, 'stock must be a  number'));
    }

    const name = req.body.name
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
        
        
    const newCheese = new Cheese({
        ...req.body,
        name,
        userId: req.user.id
    })
    try {
        const savedCheese = await newCheese.save()
        res.status(201).json(savedCheese)
    } catch (error) {
        next(error);
        
    }

}

export const getCheeses = async (req, res , next)=>{
    try {
      const startIndex = parseInt(req.query.startIndex)||0;
      const limit = parseInt(req.query.limit)||5;
      const sortDirection = req.query.order === 'asc' ? 1 :-1;
      const Cheeses = await Cheese.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.price && {priceS:req.query.priceS}),
        
        
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.cheeseId && {_id:req.query.cheeseId}),
        ...(req.query.searchTerm && {
          $or:[
            { name: { $regex: req.query.searchTerm,$options: 'i'}},
            
          ],
        }),
  
      }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
        
      const totalCheeses = await Cheese.countDocuments()
      const now = new Date()
      const oneMonthAgo =new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
      const lastMonthCheeses = await Cheese.countDocuments({
        createdAt :{ $gte :oneMonthAgo},
  
      })
       res.status(200).json({
        Cheeses,
        totalCheeses,
        lastMonthCheeses,
       })
  
    } catch (error) {
      next(error)
    }
  };

  export const deletecheese = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can delete cheese'));
    }
    try {
        await Cheese.findByIdAndDelete(req.params.cheeseId)
        res.status(200).json('Cheese has been deleted')
    } catch (error) {
        next(error);
        
    }

  }
  export const updatecheese = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can update cheese'));
    }
    try {
      const updateCheese = await Cheese.findByIdAndUpdate(req.params.cheeseId, {
        $set:{
          name: req.body.title,
          
          price: req.body.price,
          
          image: req.body.image,
          stock: req.body.stock,
          status: req.body.status
        }
      },{new:true})
      res.status(200).json(updateCheese)
    } catch (error) {
      next(error)
    }

  }