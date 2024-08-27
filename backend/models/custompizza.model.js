import mongoose from 'mongoose';

const customPizzaSchema = new mongoose.Schema(
  {
    userId: {
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
        'https://firebasestorage.googleapis.com/v0/b/pizza-mern.appspot.com/o/custom-pizza.png?alt=media&token=6e4781fb-58d7-49cc-895a-a48694454ea9',
    },
     base: {
      type: mongoose.Types.ObjectId,
      ref:'Base',
      //required: true,
    },
    sauce: {
        type: mongoose.Types.ObjectId,
      ref:'Sauce',
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
      // size:{
      //   type: mongoose.Types.ObjectId,
      //   ref:'Size',
      //   //required: true,
      // },
         
      
      price:{
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

const CustomPizza = mongoose.model('CustomPizza', customPizzaSchema);

export default CustomPizza;