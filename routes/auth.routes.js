const auth_controller=require("../controllers/auth.controller")
const auth_mw=require("../middlewares/auth.mw")
module.exports=(app)=>{
    app.post("/todo/api/v1/auth/signup",[auth_mw.verifySignup],auth_controller.signup)

    app.post("/todo/api/v1/auth/signin",[auth_mw.verifySignin],auth_controller.signIn)
}