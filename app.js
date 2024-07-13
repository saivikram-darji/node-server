const exp = require('express')
const app = exp()


const mgClient = require('mongodb').MongoClient; 


//database connection url
const dburl="mongodb+srv://vikramdb:vikramdb@cluster0.5cdgjzk.mongodb.net/?retryWrites=true&w=majority"

app.use(exp.json())

//connecting with db url
mgClient.connect(dburl)
.then((client)=>{
    //get db object
    let dbobj=client.db('vikramdb')
    //get collection object
    let usercollectionobj=dbobj.collection('usercollection')
    let productcollectionobj=dbobj.collection('produtscollection')

    //sharing collection object to API's
    app.set("usercollectionobj",usercollectionobj)
    app.set("productcollectionobj",productcollectionobj)

    console.log("db connection is success")
})
.catch(err=>console.log("error in db connection",err))






app.use('/user-api',require('./routes/userRoutes'))
app.use('/product-api',require('./routes/productRoutes'))

// //middleware
// const middleware1=(Request,Response,next)=>{
//     console.log("middleware1")
//     //write own logic
//     next()
// }
// //user middleware
// app.use(middleware1)

//invalid path error handling
app.use((Request,Response,next)=>{
    Response.send({message:`path ${Request.url} is invalid`})
})

//error handling
app.use((error,Request,Response,next)=>{
    Response.send({message:`Error occured`,payload:error.message})
})

app.listen(4000,()=>console.log("server running on port 4000"))