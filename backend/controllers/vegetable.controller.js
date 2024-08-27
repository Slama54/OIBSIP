import Vegetable from "../models/vegetables.model.js";
import { errorHandler } from "../utils/error.js";

export const createVegetable = async (req, res, next)=>{
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
        
        
    const newVegetable = new Vegetable({
        ...req.body,
        name,
        userId: req.user.id
    })
    try {
        const savedVegetable = await newVegetable.save()
        res.status(201).json(savedVegetable)
    } catch (error) {
        next(error);
        
    }

}

export const getVegetables = async (req, res , next)=>{
    try {
      const startIndex = parseInt(req.query.startIndex)||0;
      const limit = parseInt(req.query.limit)||6;
      const sortDirection = req.query.order === 'asc' ? 1 :-1;
      const Vegetables = await Vegetable.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.price && {priceS:req.query.priceS}),
        
        
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.vegetableId && {_id:req.query.vegetableId}),
        ...(req.query.searchTerm && {
          $or:[
            { name: { $regex: req.query.searchTerm,$options: 'i'}},
            
          ],
        }),
  
      }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
        
      const totalVegetables = await Vegetable.countDocuments()
      const now = new Date()
      const oneMonthAgo =new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
      const lastMonthVegetables = await Vegetable.countDocuments({
        createdAt :{ $gte :oneMonthAgo},
  
      })
       res.status(200).json({
        Vegetables,
        totalVegetables,
        lastMonthVegetables,
       })
  
    } catch (error) {
      next(error)
    }
  };

  export const deletevegetable = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can delete vegetable'));
    }
    try {
        await Vegetable.findByIdAndDelete(req.params.vegetableId)
        res.status(200).json('Vegetable has been deleted')
    } catch (error) {
        next(error);
        
    }

  }
  export const updatevegetable = async(req,res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'Only admin users can update vegetable'));
    }
    try {
      const updateVegetable = await Vegetable.findByIdAndUpdate(req.params.vegetableId, {
        $set:{
          name: req.body.title,
          
          price: req.body.price,
          
          image: req.body.image,
          stock: req.body.stock,
          status: req.body.status
        }
      },{new:true})
      res.status(200).json(updateVegetable)
    } catch (error) {
      next(error)
    }

  }