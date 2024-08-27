import express from 'express';
import mongoose from 'mongoose';    
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

import pizzaRoutes from './routes/pizza.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import commentRoutes from './routes/comment.route.js';
import baseRoutes from './routes/base.route.js';
import cheeseRoutes from './routes/cheese.route.js';
 import sauceRoutes from './routes/sauce.route.js';
 import meatRoutes from './routes/meat.route.js'
import orderRoutes from './routes/order.route.js'

const app = express();      
app.use(express.json())
  app.use(cookieParser());
dotenv.config();
// Connect to MongoDB       

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000,()=>{
    console.log('Server started on port 3000');
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

  app.use('/api/user',userRoutes)
  app.use('/api/auth',authRoutes);
  app.use('/api/pizza',pizzaRoutes)
  app.use('/api/comment',commentRoutes)
  app.use('/api/order',orderRoutes)
  app.use('/api/base', baseRoutes)
  app.use('/api/cheese', cheeseRoutes)
  app.use('/api/sauce', sauceRoutes)
  app.use('/api/meat', meatRoutes)


  