import mongoose, { Schema } from "mongoose";
 const sauceSchema = new mongoose.Schema(
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
            default: 'https://joyfoodsunshine.com/wp-content/uploads/2018/09/best-homemade-pizza-sauce-recipe-1.jpg',
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
 const Sauce = mongoose.model('Sauce', sauceSchema);

export default Sauce;