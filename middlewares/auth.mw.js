const user_model=require("../model/user.model")

async function verifySignup(req,res,next)
{
    if(!req.body.name)
    {
        return res.status(400).send({message:"name is not provided"})
    }
    if(!req.body.email)
    {
        return res.status(400).send({
            error:"email is not provided"
        })
    }
    const found=await user_model.findOne({email:req.body.email})
    if(found)
    {
        return res.status(400).send({message:"User already exist with this email id please select different email"})
    }
    if(!req.body.password)
    {
        return res.status(400).send({message:"Please keep a password for authentication purpose"})
    }
    next()
}

function verifySignin(req,res,next){
    if(!req.body.email)
    {
        return res.status(400).send({
            error:"email is not provided"
        })
    }
    if(!req.body.password)
    {
        return res.status(400).send({message:"Please provide a valid password to proceed"})
    }
    next()
}

module.exports={
    verifySignin,
    verifySignup
}