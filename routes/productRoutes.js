const exp = require('express')
const routes = exp.Router()
const productController = require('../controller/productController')

routes.post('/createProduct',productController.createProduct)

routes.get('/getProducts',productController.getProducts)

routes.get('/getProduct/:id',productController.getProduct)

routes.put('/updateProduct',productController.updateProduct)

routes.delete('/deleteProduct/:id',productController.deleteProduct)


module.exports = routes;