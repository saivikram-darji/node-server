const expressasynchandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createUser = expressasynchandler(async(req,res)=>{
     //get usercollection
     let usercollectionobj = req.app.get('usercollectionobj')
     //load request body
     let newUser = req.body
 
     //check user name exists or not
     let user = await usercollectionobj.findOne({name:newUser.name})
     // console.log(user)
     if(user==null)
     {
         //converting plain text to encrypte
         let hashedPass = await bcrypt.hash(newUser.name,6)
         newUser.password = hashedPass
         //to check password is encrypted or not
         console.log(newUser)
         
         //inserting into db colletion
         usercollectionobj.insertOne(newUser)
 
         res.send({message:"user created successfully"})
     }
     else
     {
         res.send({message:"user already exist",payload:`${newUser.name}`})
     }
})

const getUsers = expressasynchandler(async(req,res)=>{

    usercollectionobj = req.app.get('usercollectionobj')
    //finding all users in collection
    let users = await usercollectionobj.find().toArray()
    if(users!=null)
    {
        res.send({message:"all users",payload:users})
    }
    else{
        res.send({message:"Failed to get all users"})
    }
}) 

const getUser = expressasynchandler(async(req,res)=>{
    let userId = +req.params.id
   usercollectionobj = req.app.get('usercollectionobj')
   

   //finding the user by id
   let user= await usercollectionobj.findOne({id: userId})
    console.log(user)
    
   if(user==undefined)
   {
    res.send({message:"user doesn't exist"})
   }
   else{
    res.send({message:"user details", payload:user})
   }
}) 

const updateUser = expressasynchandler(async(req,res)=>{
    let newData = req.body;
    let usercollectionobj = req.app.get('usercollectionobj')
    console.log(newData)
    //query to update the user by id
    let result = await usercollectionobj.updateOne({id: newData.id},{$set: {name: newData.name, email: newData.email, age: newData.age}})
    // console.log(result)
    if(result==null)
    {
        res.send({message:"Failed to update the user details"})
    }
    else{
            res.send({message:"user updated",payload:result})
    }
}) 

const deleteUser = expressasynchandler(async(req,res)=>{
    let removeId = +req.params.id
    let usercollectionobj = req.app.get('usercollectionobj')

    //query if user is exits or not
    let isUser = await usercollectionobj.findOne({id:removeId})
   if(isUser!=null)
   {
     //query to delete user by id
     let result = await usercollectionobj.deleteOne({id:removeId})
     console.log(result)
     
     if(result!=null)
     {
         res.send({message:"deleted"})
     }
     else{
         res.send({message:"Failed to delete the user"})
     }
   }
   else{
    res.send({message:"User doesn't exit"})
   }
})

const userLogIn = expressasynchandler(async(req,res)=>{
    let userId = +req.body.userId
    let pass = req.body.password
    let usercollectionobj=req.app.get('usercollectionobj')
    console.log(pass)
    //check if user is exists
    let isUser = await usercollectionobj.findOne({id:userId})
    console.log(isUser)
    if(isUser==null)
    {
        req.send({message:"User not exist"})
    }
    else{
        //checking the password is matching
        bcrypt.compare(pass,isUser.password,(err,result)=>{
            if(err)
            {
                    console.err('error comparing password',err)
                    res.send({message:"error occured"})
            }
            else if(result==false)
            {
                res.send({message:"Invalid password"})
            }
            else{
                //sending a web token
                let token = jwt.sign({userId:isUser.id}, "#vikram-key123",{expiresIn:100})
                console.log(token)
                //send token
                Response.send({message:"login success",payload:token})
                
            }

        }); 
    }
}) 


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    userLogIn
}