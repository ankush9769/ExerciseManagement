import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userroutes from './routes/users.js'
import exerciseroutes from './routes/exercises.js'

const app=express()
dotenv.config()
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
 .then(()=>{
    console.log("connected to database")
 })

app.use('/user',userroutes)
app.use('/exercise',exerciseroutes)


app.listen(5000,()=>{
    console.log("server is running on port 5000 at http://localhost:5000")
})
