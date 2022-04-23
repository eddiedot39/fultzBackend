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
  profilePhoto: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
  }
})

const user = mongoose.model("User", userSchema)

export default user