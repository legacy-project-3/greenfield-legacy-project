const {Cart, Product, Image} = require('../indexdatabase.js')

const addCart = async(req, res) => {
    try {
        const cartproduct = await Cart.create(req.body)
        res.status(200).send(cartproduct)
    }
    catch(error) {
        res.status(500).send(error)
    }
}

const getAllCart = async (req,res)=>{
    try {
        const cartitems = await Cart.findAll()
        res.status(200).send(cartitems)
    }
    catch(error) {
        res.status(500).send(error)
    }
}

const getCartforUser = async (req, res) => {
    iduser= req.params.id
    try {
        const items = await Cart.findAll({
            where: {userId: iduser}, 
             include: {
                model: Product, 
                include: {
                    model: Image,
                }
            }
        })
        res.status(200).send(items)
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    addCart,
    getAllCart,
    getCartforUser

}