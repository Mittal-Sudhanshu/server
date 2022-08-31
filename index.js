const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const solutionRoutes = require('./routes/solutionRoutes')
const fileUpload = require('express-fileupload')

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
connectDB()
app.use(fileUpload({
    useTempFiles:true
}))
app.use('/api/user',userRoutes)
app.use('/api/question',questionRoutes)
app.use('/api/solution',solutionRoutes)

app.listen(PORT,()=>{
    console.log('server started successfully')
})