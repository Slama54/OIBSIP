import mongoose, { Schema } from "mongoose";
 const vegetablesShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            
        },
        photo: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-f9Ww_l1ursRWkE7_-ZH3b72BYkmGAHtWGw&s',
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
          },
          available: {
            type: Boolean,
            default: true,
          },

    },{ timestamps: true }
 )
 const Pizza = mongoose.model('Vegetables', vegetablesShema);

export default Vegetables;