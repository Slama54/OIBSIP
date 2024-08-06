import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'


export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({ username, email, password:hashedPassword, phone, address });
try {
    await newUser.save()
    res.json('signup secceful') 
} catch (error) {
    res.status(500).json({message: error.message})
}



};
