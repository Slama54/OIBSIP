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
    base: {
      type: mongoose.Types.ObjectId,
      ref:'Base',
      required: true,
    },
    sauce: {
        type: mongoose.Types.ObjectId,
      ref:'Souce',
      required: true,
      },
      cheese: {
        type: mongoose.Types.ObjectId,
        ref:'Chesse',
        required: true,
      },
      vegetables: {
        type: mongoose.Types.ObjectId,
        ref:'Vegetables',
        required: true,
      },
      size:{
        type: mongoose.Types.ObjectId,
        ref:'Size',
        required: true,
      },
        
      
      price:{
        type: Number,
        required: true,
      },

    
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