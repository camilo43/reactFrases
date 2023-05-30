import mongoose from "mongoose";

const newSignUp = new mongoose.Schema({
    userName:{
        type:String,
        // required:true,
        // unique:true
    },
     email:{
         type:String,
         required:true,
         unique:true,
         validate:{
             validator:function(value){
                 return /\S+@\S+\.com/.test(value);
             }
         }
     },
     password:{
         type:String,
         required:true,
         unique:true
     }
})

const SignUp_model = mongoose.model("Signup", newSignUp)

export { SignUp_model }