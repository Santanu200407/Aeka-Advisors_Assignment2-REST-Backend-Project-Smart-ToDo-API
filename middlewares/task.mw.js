 function createTask(req,res,next)
 {
    if(!req.body.taskTitle)
    {
        return res.status(400).send({message:"task Title is not provided"})
    }
    if(!req.body.taskDescription)
    {
        return res.status(400).send({message:"task description is not provided"})
    }
    next()
 }

 module.exports={
    createTask
 }