const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config()

const app=express()
app.use(express.json())
mongoose.connect(process.env.DB_URL)
const db=mongoose.connection
db.on("error",()=>{
    console.log("error while connecting to database")
})
db.once("open",()=>{
    console.log("MongoDB database connected")
})

require("./routes/auth.routes")(app)
require("./routes/task.routes")(app)
app.listen(process.env.PORT || 4040,()=>{
    console.log("Server started")
})