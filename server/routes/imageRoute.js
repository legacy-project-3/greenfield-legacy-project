const express = require ("express")
const imageRouter= express.Router()
const {addImage, getImages} = require ("../Controllers/images.js")

imageRouter.post("/add", addImage )
imageRouter.get("/get/:productid", getImages)

module.exports=imageRouter