import mongoose, { Schema } from "mongoose";
 const cheeseShema = new mongoose.Schema(
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
        }
    }
 )
 const Pizza = mongoose.model('Cheese', cheeseShema);

export default Cheese;