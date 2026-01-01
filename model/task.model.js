const mongoose=require("mongoose")
const taskSchema=mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    taskTitle:{
        type:String,
        required:true
    },
    taskDescription:{
        type:String,
        required:true
    },
    status:{
        type:"String",
        enum:["pending","completed"],
        default:"pending"
    },
    priority: { 
        type: String, 
        enum: ["low", "medium", "high"], 
        default: "high" 
    }
},{timestamps:true,versionKey:false})
module.exports=mongoose.model("task",taskSchema)