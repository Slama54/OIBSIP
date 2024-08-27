import mongoose, { Schema } from "mongoose";
 const baseSchema = new mongoose.Schema(
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
            default: 'https://e7.pngegg.com/pngimages/75/98/png-clipart-sicilian-pizza-salami-california-style-pizza-italian-cuisine-pizza-base-food-cheese-thumbnail.png',
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
 const Base = mongoose.model('Base', baseSchema);

export default Base;