import mongoose, { Schema } from "mongoose";
 const cheeseSchema = new mongoose.Schema(
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
            default: 'https://e7.pngegg.com/pngimages/254/955/png-clipart-gruyere-cheese-cheesecake-swiss-cheese-cheese-cheese-slice-food-cheese-thumbnail.png',
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
 const Cheese = mongoose.model('Cheese', cheeseSchema);

export default Cheese;