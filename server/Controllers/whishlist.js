const {Whishlist, Product, Image} = require('../indexdatabase.js')

const addWhishlist = async(req, res) => {
    try {
        const products = await Whishlist.create(req.body)
        res.status(200).send(products)
    }
    catch(error) {
        res.status(500).send(error)
    }
}

const getWhishlist = async (req,res)=>{
    try {
        const items = await Whishlist.findAll()
        res.status(200).send(items)
    }
    catch(error) {
        res.status(500).send(error)
    }
}

const getWhishlistforUser = async (req, res) => {
    iduser= req.params.id
    try {
        const items = await Whishlist.findAll({
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

const deleteProductWishlist = async (req, res)=>{
    const whishid = req.params.id
    try {
        const deleted = Whishlist.destroy({where: {id: whishid}})
        res.status(200).send("deleted from whishlist")
    }
    catch(error) {
        res.status(500).send(error)
    }
}

module.exports = {
    addWhishlist,
    getWhishlist,
    getWhishlistforUser,
    deleteProductWishlist

}