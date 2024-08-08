import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res ,next) => {
  const { username, email, password, address, phone } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !address ||
    !phone ||
    username === "" ||
    password === "" ||
    email === "" ||
    address === "" ||
    phone === ""
  ) {
    next(errorHandler(400,'All fields are required'))
  }
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({ username, email, password:hashedPassword, phone, address });
try {
    await newUser.save()
    res.json('signup secceful') 
} catch (error) {
    next(error);
}



};
