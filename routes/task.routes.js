const Token=require("../middlewares/token.mw")
const task_mw=require("../middlewares/task.mw")
const task_controller=require("../controllers/task.controller")
module.exports=(app)=>{
    app.get("/todo/api/v1/tasks",[Token.verifyToken],task_controller.fetchTodo)

    app.post("/todo/api/v1/tasks",[Token.verifyToken,task_mw.createTask],task_controller.createTodo)

    app.put("/todo/api/v1/tasks/:id",[Token.verifyToken],task_controller.updateTodo)

    app.delete("/todo/api/v1/tasks/:id",[Token.verifyToken],task_controller.deleteTodo)
}