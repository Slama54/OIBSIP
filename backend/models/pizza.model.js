import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    /* base: {
      type: mongoose.Types.ObjectId,
      ref:'Base',
      //required: true,
    },
    sauce: {
        type: mongoose.Types.ObjectId,
      ref:'Souce',
      required: true,
      },
      cheese: {
        type: mongoose.Types.ObjectId,
        ref:'Chesse',
       // required: true,
      },
      vegetables: {
        type: mongoose.Types.ObjectId,
        ref:'Vegetables',
        //required: true,
      },
      meats: {
        type: mongoose.Types.ObjectId,
        ref:'Meats',
        //required: true,
      },
      size:{
        type: mongoose.Types.ObjectId,
        ref:'Size',
        //required: true,
      },
         */
      
      priceS:{
        type: Number,
        
        required: true,
      },
      priceM:{
        type: Number,
        
        required: true,
      },
      priceL:{
        type: Number,
        
        required: true,
      },
      /* price: {
        type: Map, // Using Map for key-value structure
        of: Number, // The value type is Number, representing the price for each size
        default: { 'S': 10, 'M': 15, 'L': 20 }, // Example default prices for different sizes
      }, */

    
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Pizza = mongoose.model('Pizza', pizzaSchema);

export default Pizza;