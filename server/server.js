import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'

const app=express()

//connect to database
await connectDB()


const PORT=process.env.PORT||5000
app.use(cors())

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})