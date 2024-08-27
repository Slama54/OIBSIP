import Meat from "../models/meats.model.js";
import { errorHandler } from "../utils/error.js";

export const createMeat = async (req, res, next)=>{
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
        
        
    const newMeat = new Meat({
        ...req.body,
        name,
        userId: req.user.id
    })
    try {
        const savedMeat = await newMeat.save()
        res.status(201).json(savedMeat)
    } catch (error) {
        next(error);
        
    }

}

export const getMeats = async (req, res , next)=>{
    try {
      const startIndex = parseInt(req.query.startIndex)||0;
      const limit = parseInt(req.query.limit)||6;
      const sortDirection = req.query.order === 'asc' ? 1 :-1;
      const Meats = await Meat.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.price && {priceS:req.query.priceS}),
        
        
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.meatId && {_id:req.query.meatId}),
        ...(req.query.searchTerm && {
          $or:[
            { name: { $regex: req.query.searchTerm,$options: 'i'}},
            
          ],
        }),
  
      }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
        
      const totalMeats = await Meat.countDocuments()
      const now = new Date()
      const oneMonthAgo =new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
      const lastMonthMeats = await Meat.countDocuments({
        createdAt :{ $gte :oneMonthAgo},
  
      })
       res.status(200).json({
        Meats,
        totalMeats,
        lastMonthMeats,
       })
  
    } catch (error) {
      next(error)
    }
  };

  export const deletemeat = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can delete meat'));
    }
    try {
        await Meat.findByIdAndDelete(req.params.meatId)
        res.status(200).json('Meat has been deleted')
    } catch (error) {
        next(error);
        
    }

  }
  export const updatemeat = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can update meat'));
    }
    try {
      const updateMeat = await Meat.findByIdAndUpdate(req.params.meatId, {
        $set:{
          name: req.body.title,
          
          price: req.body.price,
          
          image: req.body.image,
          stock: req.body.stock,
          status: req.body.status
        }
      },{new:true})
      res.status(200).json(updateMeat)
    } catch (error) {
      next(error)
    }

  }