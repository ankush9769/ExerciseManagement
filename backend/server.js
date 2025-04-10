import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userroutes from './routes/users.js'
import exerciseroutes from './routes/exercises.js';
import registraion from './routes/registration.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express()
dotenv.config()
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
 .then(()=>{
    console.log("connected to database")
 })
 .catch(err => console.log("database anabel to connect", err))

app.use('/user',userroutes)
app.use('/exercise',exerciseroutes)
app.use('/client',registraion)


app.listen(5000,()=>{
    console.log("server is running on port 5000 at http://localhost:5000")
})
