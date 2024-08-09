const express = require ("express")
const cartRouter = express.Router()

const {addCart, getAllCart, getCartforUser, updateCartforUser} = require ("../Controllers/Cart.js")

cartRouter.post("/add", addCart)
cartRouter.get("/get", getAllCart)
cartRouter.get("/getOne/:id", getCartforUser)
cartRouter.put("/update/:id", updateCartforUser)

module.exports= cartRouter