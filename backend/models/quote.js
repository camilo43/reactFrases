import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignUp_model",
    }
    // author: {
    //     type: String,
    //     required: true
    // },
    // liked: {
    //   type: Boolean
    // }
},{ collection: 'quote_models' })

//The DELETE request does not work well without this 
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })
  
const Quote_modelo_test = mongoose.model("Quote_model", noteSchema)

export { Quote_modelo_test }