const taskSchema=require("../model/task.model")
async function createTodo(req,res)
{
    const taskObj={
        userId:req.userId,
        taskTitle:req.body.taskTitle,
        taskDescription:req.body.taskDescription,
        status:req.body.status,
        priority:req.body.priority
    }

    try{
        const data=await taskSchema.create(taskObj)
        res.status(201).send(data)
    }
    catch(error)
    {
        res.status(500).send({error:"error occured while regestering data"})
    }
    
}
async function fetchTodo(req,res)
{
    try {
    const tasks = await taskSchema.find({ userId: req.userId });
    const task_data=tasks.map((todo)=>{
        return ({
            taskId:todo._id,
            taskTitle: todo.taskTitle,
            taskDescription: todo.taskDescription,
            status: todo.status,
            priority: todo.priority,
            createdAt:todo.createdAt,
            updatedAt:todo.updatedAt
        })
    })
    res.status(200).send(task_data);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
async function updateTodo(req,res)
{
    try{
        const data=await taskSchema.findById(req.params.id)
        if(!data)
        {
            return res.status(400).send({message:"NO task exist against this provided ID"})
        }
        if(!data.userId.equals(req.userId))
        {
            return res.status(400).send({message:"Not a valid user"})
        }
        
        data.taskTitle=req.body.taskTitle || data.taskTitle
        data.taskDescription=req.body.taskDescription || data.taskDescription
        data.status=req.body.status || data.status
        data.priority=req.body.priority || data.priority
        const updated_data=await data.save()
        res.status(200).send(updated_data)
        
    }catch(error)
    {
        res.status(500).send({ message: "Server error" })
    }
}
async function deleteTodo(req,res)
{
    const data=await taskSchema.findById(req.params.id)
    try{
    if(!data)
    {
        return res.status(400).send({message:"NO task exist against this provided ID"})
    }
    if(!data.userId.equals(req.userId))
    {
        return res.status(400).send({message:"Not a valid user"})
    }
    const deletedData=await taskSchema.deleteOne({_id:req.params.id})
    if(deletedData.deletedCount==1)
    {
        res.status(200).send({message:"Data successfully Deleted"})
    }
    else
    {
        res.status(400).send({message:"Unable to delete task"})
    }
    
    }
    catch(error)
    {
        res.status(500).send({ message: "Server error" })
    }
    
}
module.exports={
    createTodo,
    fetchTodo,
    updateTodo,
    deleteTodo
}