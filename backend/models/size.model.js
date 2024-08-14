import mongoose, { Schema } from "mongoose";
 const sizeShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            
        },
        description: {
            type: String,
            required: true
        },
       
    },{ timestamps: true }
 )
 const Pizza = mongoose.model('Size', sizeShema);

export default Size;