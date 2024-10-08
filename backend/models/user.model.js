import mongoose from 'mongoose';    
const userShema = new mongoose.Schema({
    username:{
        type :String,
        required: true, 
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:['active', 'inactive'],
        default: 'active',
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    cartData:{
        type:Object,
        default:{}
    },
},{minimize:false,timestamps:true});
const User = mongoose.model('User', userShema);
export default User