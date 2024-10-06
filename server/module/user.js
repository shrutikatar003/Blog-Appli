import mongoose from "mongoose";
const userSchma = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})
const  user = mongoose.model('user',userSchma);
export default user;