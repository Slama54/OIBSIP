import mongoose, { Schema } from "mongoose";
 const meatsSchema = new mongoose.Schema(
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
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTukYPBneWTc3LbXfdz4hPebJvlHQdjMh_Pwg&s',
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
 const Meat = mongoose.model('Meat', meatsSchema);

export default Meat;