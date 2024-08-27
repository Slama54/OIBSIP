import Sauce from "../models/sauce.model.js";
import { errorHandler } from "../utils/error.js";

export const createSauce = async (req, res, next)=>{
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
        
        
    const newSauce = new Sauce({
        ...req.body,
        name,
        userId: req.user.id
    })
    try {
        const savedSauce = await newSauce.save()
        res.status(201).json(savedSauce)
    } catch (error) {
        next(error);
        
    }

}

export const getSauces = async (req, res , next)=>{
    try {
      const startIndex = parseInt(req.query.startIndex)||0;
      const limit = parseInt(req.query.limit)||6;
      const sortDirection = req.query.order === 'asc' ? 1 :-1;
      const Sauces = await Sauce.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.price && {priceS:req.query.priceS}),
        
        
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.sauceId && {_id:req.query.sauceId}),
        ...(req.query.searchTerm && {
          $or:[
            { name: { $regex: req.query.searchTerm,$options: 'i'}},
            
          ],
        }),
  
      }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
        
      const totalSauces = await Sauce.countDocuments()
      const now = new Date()
      const oneMonthAgo =new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
      const lastMonthSauces = await Sauce.countDocuments({
        createdAt :{ $gte :oneMonthAgo},
  
      })
       res.status(200).json({
        Sauces,
        totalSauces,
        lastMonthSauces,
       })
  
    } catch (error) {
      next(error)
    }
  };

  export const deletesauce = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can delete sauce'));
    }
    try {
        await Sauce.findByIdAndDelete(req.params.sauceId)
        res.status(200).json('Sauce has been deleted')
    } catch (error) {
        next(error);
        
    }

  }
  export const updatesauce = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can update sauce'));
    }
    try {
      const updateSauce = await Sauce.findByIdAndUpdate(req.params.sauceId, {
        $set:{
          name: req.body.title,
          
          price: req.body.price,
          
          image: req.body.image,
          stock: req.body.stock,
          status: req.body.status
        }
      },{new:true})
      res.status(200).json(updateSauce)
    } catch (error) {
      next(error)
    }

  }