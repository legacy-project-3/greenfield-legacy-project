const express = require ("express")
const cartRouter = express.Router()

const {addCart, getAllCart, getCartforUser} = require ("../Controllers/Cart.js")

cartRouter.post("/add", addCart)
cartRouter.get("/get", getAllCart)
cartRouter.get("/getOne/:id", getCartforUser)

module.exports= cartRouter