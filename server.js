import express from "express"
import cors from "cors"
import auth from './routes/auth.js'
import error from './middleware/error.js'
import connect from './db/connect.js'


connect() // lidhja me databazen

const app = express()

//middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))
app.use(cors()) // cross origin resource sharing lejon komunikimin nga nje burim i tret pervec vetes


//routet
app.use('/auth', auth) //routi per autentifikimin e userit

//error handler perdoret per te kthyer errorin ne format json dhe jo html
app.use(error)

//zgjedhim porten q duam te hapim serverin dhe nje funksion qe kryhet pasi krijohet serveri
app.listen(4000, () => console.log('Server started on port 4000'));