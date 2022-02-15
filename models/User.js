import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add an email address"]
  },
  password: {
    type: String,
    required: [true, "Please add a password"]
  },
  status: {
    type: String,
    required: [true, "Please add a status"]
  },
  profilePhotoBase64: {
    type: String,
    required: false,
    default: null
  }
})

const user = mongoose.model("User", userSchema)

export default user