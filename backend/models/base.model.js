import mongoose, { Schema } from "mongoose";
 const baseShema = new mongoose.Schema(
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
        }
    }
 )
 const Pizza = mongoose.model('Base', baseShema);

export default Base;