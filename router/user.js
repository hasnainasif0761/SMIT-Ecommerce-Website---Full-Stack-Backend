const express = require('express');
const {createProduct,getData} = require('../controller/product');
const uploads = require('../middleware/UploadMiddleware');
const { createUser, getUsers } = require('../controller/user.controller');

const router = express.Router();

router.get('/addproduct',(req,res)=>{
    res.render('form')
})

router.post('/productadd',createProduct)

router.get('/product',getData)

router.post("/create-user",uploads.single("image"),createUser)

router.get("/users", getUsers);

module.exports = router