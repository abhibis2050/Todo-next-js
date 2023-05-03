import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    uniqe:true,
    required:true
},
password:{
    type:String,
    required:true,
    // select:false
},
})

mongoose.models={}
export const User = mongoose.model("User",userSchema)