import express from "express"
import cors from "cors"
import auth from './routes/auth.js'
import user from './routes/user.js'
import post from './routes/post.js'
import error from './middleware/error.js'
import connect from './db/connect.js'
import dotenv from 'dotenv'

dotenv.config()

connect() // lidhja me databazen

const app = express()

//middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))
app.use(cors()) // cross origin resource sharing lejon komunikimin nga nje burim i tret pervec vetes


//routet
app.use('/auth', auth) //routi per autentifikimin e userit
app.use('/user', user) // routi per te dhenat e userit: edit user, 
app.use('/post', post)

//error handler perdoret per te kthyer errorin ne format json dhe jo html
app.use(error)

//zgjedhim porten q duam te hapim serverin dhe nje funksion qe kryhet pasi krijohet serveri
app.listen(4000, () => console.log('Server started on port 4000'));