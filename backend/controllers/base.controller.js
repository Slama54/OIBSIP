import Base from "../models/base.model.js";
import { errorHandler } from "../utils/error.js";

export const createBase = async (req, res, next)=>{
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
        
        
    const newBase = new Base({
        ...req.body,
        name,
        userId: req.user.id
    })
    try {
        const savedBase = await newBase.save()
        res.status(201).json(savedBase)
    } catch (error) {
        next(error);
        
    }

}

export const getBases = async (req, res , next)=>{
    try {
      const startIndex = parseInt(req.query.startIndex)||0;
      const limit = parseInt(req.query.limit)||6;
      const sortDirection = req.query.order === 'asc' ? 1 :-1;
      const Bases = await Base.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.price && {priceS:req.query.priceS}),
        
        
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.baseId && {_id:req.query.baseId}),
        ...(req.query.searchTerm && {
          $or:[
            { name: { $regex: req.query.searchTerm,$options: 'i'}},
            
          ],
        }),
  
      }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
        
      const totalBases = await Base.countDocuments()
      const now = new Date()
      const oneMonthAgo =new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
      const lastMonthBases = await Base.countDocuments({
        createdAt :{ $gte :oneMonthAgo},
  
      })
       res.status(200).json({
        Bases,
        totalBases,
        lastMonthBases,
       })
  
    } catch (error) {
      next(error)
    }
  };

  export const deletebase = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can delete base'));
    }
    try {
        await Base.findByIdAndDelete(req.params.baseId)
        res.status(200).json('Base has been deleted')
    } catch (error) {
        next(error);
        
    }

  }
  export const updatebase = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can update base'));
    }
    try {
      const updateBase = await Base.findByIdAndUpdate(req.params.baseId, {
        $set:{
          name: req.body.title,
          
          price: req.body.price,
          
          image: req.body.image,
          stock: req.body.stock,
          status: req.body.status
        }
      },{new:true})
      res.status(200).json(updateBase)
    } catch (error) {
      next(error)
    }

  }