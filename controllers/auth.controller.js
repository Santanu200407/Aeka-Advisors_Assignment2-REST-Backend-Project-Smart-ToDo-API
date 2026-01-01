const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const user_model=require("../model/user.model")
async function signup(req,res){
    const rb=await req.body
    const userObj={
        name:rb.name,
        email:rb.email,
        password:bcrypt.hashSync(rb.password,8)
    }
    try{
        const user=await user_model.create(userObj)
        const user_data={
            name:user.name,
            email:user.email,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            message:`welcome ${user.name} to smart todo api application`
        }
        console.log(user)
        res.status(201).send(user_data)
    }
    catch(error)
    {
        console.log("Error while regestering the user",error)
        res.status(500).send({
            message:"some error happened while regestering the user"
        })
    }
}

async function signIn(req,res)
{   const rb=await req.body
    const user=await user_model.findOne({email:rb.email})
    if(user==null)
    {
        return res.status(400).send("user Id is not a valid user id")
    }
    const isPass=bcrypt.compareSync(rb.password,user.password)
    if(!isPass)
    {
        return res.status(401).send("wrong password")
    }
    const token=jwt.sign({userId:user._id},process.env.secretcode,{
        expiresIn:21600
    })
    res.status(200).send({
        name:user.name,
        email:user.email,
        token:token
    })

}
module.exports={
    signup,
    signIn
}