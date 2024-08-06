const express= require ("express")
const whishlistrouter= express.Router()

const { addWhishlist, getWhishlist, getWhishlistforUser, deleteProductWishlist} = require ("../Controllers/whishlist.js")

whishlistrouter.post("/add", addWhishlist)
whishlistrouter.get("/get", getWhishlist)
whishlistrouter.get("/whishOneuser/:id", getWhishlistforUser)
whishlistrouter.delete("/delete/:id", deleteProductWishlist)

module.exports = whishlistrouter

