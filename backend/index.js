import express from 'express';
import mongoose from 'mongoose';    

const app = express();      

// Connect to MongoDB       

mongoose.connect('mongodb://localhost:27017/pizza')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

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