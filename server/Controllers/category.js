const {Category} = require("../indexdatabase.js")


const addCategory = async(req, res) => {
    try {
      console.log("body", req.body)
        const category = await Category.create(req.body)
         res.status(200).send(category)
    }
    catch (error) {
        res.status(500).send(error)
    }

}

const getAllcategory = async (req, res) => {
    try {
        const categories= await Category.findAll()
        res.status(200).send(categories)
        
    }
    catch (error) {
        res.status(500).send(error)
    }
}

const deleteCategory = async (req,res) => {
    const {id}=req.params
    try {
        const categories = await Category.destroy({where: {id:id}})
        res.status(200).send("deleted YOYOYO")
    }
    catch(error) {
        res.status(500).send(error)
    } 

}
const updateCategory = async(req,res)=>{
        const { id } = req.params
        const { name} = req.body
      
        try {
          const updated = await Category.update(
            { name},
            { where: { id } }
          )
            res.status(200).send(updated);
         
        } 
        catch (error) {
          console.error(error);
          res.status(404).send(error);
        }
      };
      const getOneCategory = async(req,res)=>{
        try{
          const getOne=await Category.findOne({ where: { name: req.params.name } })
          res.status(200).send(getOne)
        }
        catch(err){
          res.status(404).send(err)
        }
      }
      module.exports = {
        getOneCategory,
        addCategory,
        getAllcategory,
        deleteCategory,
        updateCategory
      }