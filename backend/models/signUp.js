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
        required:function() {
            return !this.googleId;
          },
        sparse: true
        },
    googleId: String,
    
    quotes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote_model'
    }]
},{ collection: 'signup_models' })

newSignUp.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

const SignUp_model_test = mongoose.model("SignUp_model", newSignUp)
export { SignUp_model_test }