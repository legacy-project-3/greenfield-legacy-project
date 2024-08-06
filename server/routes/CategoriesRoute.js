const express=require('express')
const categoryRoute = express.Router()
const { addCategory, getAllcategory,deleteCategory, updateCategory, getOneCategory}=require('../Controllers/category.js')


categoryRoute.get('/get',getAllcategory);
categoryRoute.post('/add',addCategory);
categoryRoute.delete('/delete/:id',deleteCategory);
categoryRoute.put('/update/:id',updateCategory);
categoryRoute.get('/getOne/:name',getOneCategory);

module.exports =  categoryRoute