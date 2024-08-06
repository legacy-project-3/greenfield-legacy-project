const express=require('express');
const {getAllProdAndImages,getAllProduct, getOneProduct, addProduct, deleteProduct, updateProduct, getAllProductByCategories, getProdAndImage } = require('../Controllers/Products.js');
const productRoute=express.Router()

productRoute.get('/get',getAllProduct);
productRoute.get('/getprodpic',getAllProdAndImages)
productRoute.get('/get/:id',getOneProduct);
productRoute.post('/add',addProduct);
productRoute.delete('/delete/:id',deleteProduct);
productRoute.put('/update/:id',updateProduct);
productRoute.get ('/prodimage/:userId', getProdAndImage)
productRoute.get('/getbycategory/:id',getAllProductByCategories)
module.exports = productRoute