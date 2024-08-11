const express = require ("express")
const imageRouter= express.Router()
const {addImage, getImages, updateImage} = require ("../Controllers/images.js")

imageRouter.post("/add", addImage )
imageRouter.get("/get/:productid", getImages)
imageRouter.put("/update/:id",updateImage)


module.exports=imageRouter