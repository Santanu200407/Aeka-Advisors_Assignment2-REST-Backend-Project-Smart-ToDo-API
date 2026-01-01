const jwt=require("jsonwebtoken")
const user_model=require("../model/user.model")
function verifyToken(req,res,next){
    const token=req.header('x-access-token')
    if(!token)
    {
        return res.status(403).send({
            message:"No token found:UnAuthorized"
        })
    }
    jwt.verify(token,process.env.secretcode,async(error,decoded)=>{
        if(error)
        {
            return res.status(401).send({
                message:"UnAuthorized !"
            })
        }
        const user=await user_model.findOne({_id:decoded.userId})
        if(!user)
        {
            return res.status(400).send({
                message:"UnAuthorized,this user for this token doesn't exist"
            })
        }
        req.userId=user._id
        next()
    })

}
module.exports={
    verifyToken
}