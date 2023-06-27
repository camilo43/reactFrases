import mongoose from "mongoose";
import { SignUp_model } from "./signUp.js";

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
    // user: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Signup_model",
    // }]
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

const Quote_model = mongoose.model("Quote_model", noteSchema)

export { Quote_model }