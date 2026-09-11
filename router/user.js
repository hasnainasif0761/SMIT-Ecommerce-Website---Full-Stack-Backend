const express = require('express');
const uploads = require('../middleware/UploadMiddleware');
const {
    createProduct,
    getData,
    updateProduct,
    deleteProduct
} = require('../controller/product');

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controller/user.controller');

const router = express.Router();

router.get('/addproduct',(req,res)=>{
    res.render('form')
})


router.post('/productadd',createProduct)

router.get('/product',getData)

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);


router.post("/create-user",uploads.single("image"),createUser)

router.get("/users", getUsers);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

module.exports = router