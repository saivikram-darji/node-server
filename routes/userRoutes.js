const exp = require('express')
const userController = require('../controller/userController') 
const routes = exp.Router();


// create user
routes.post('/createUser',userController.createUser)

// get all users
routes.get('/getUsers',userController.getUsers)

// get user by id
routes.get('/getUser/:id',userController.getUser)

// update user by id
routes.put('/updateUser',userController.updateUser)

// delete user by id
routes.delete('/removeUser/:id',userController.deleteUser)

// user login
routes.post('/login',userController.userLogIn)


module.exports = routes;