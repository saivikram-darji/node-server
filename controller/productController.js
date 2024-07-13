const expressasynchandler = require('express-async-handler')


const createProduct = expressasynchandler(async(req,res) => {
    let newProduct=req.body
    //get productcollection obj
    let productobj = req.app.get('productcollectionobj')

    let results= await productobj.insertOne(newProduct)
    res.send({message:"product Created"})
})

const getProducts = expressasynchandler(async(req,res) => {
     //get productcollection obj
     let productobj = req.app.get("productcollectionobj")
     let results =await productobj.find().toArray()
     res.send({
         data : results,
         message:"all products"
     })    
})

const getProduct = expressasynchandler(async(req,res) => {
    let Product = req.params.id
   let productobj = req.app.get("productcollectionobj")

   let results= await productobj.findOne({ProdId:{$eq:Product}})
   console.log(res)

   res.send({message:"product details", payload:results})    
})

const updateProduct = expressasynchandler(async(req,res) => {
    let moddata = req.body

    console.log(moddata)//checking the request data
    let productobj = req.app.get("productcollectionobj")

    let results = await productobj.updateOne({ProdId : moddata.prodId},{$set:{price : moddata.price}})

    console.log(res)

    if(results==null || undefined)
    {
        res.send({message:"Failed to update the product"})
    }
    else{
        
        res.send({message:"user updated",data:results})
    }    
})

const deleteProduct = expressasynchandler(async(req,res) => {

})


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}