
const {Image} = require ("../indexdatabase.js")

const addImage = async (req, res)=>{
    try {
        const body= req.body
        console.log("body", body)
        const image = await Image.create(body)
        res.status(200).send("image added successfully")
    }
    catch (error) {
        res.status(500).send(error)
    }
}


const getImages= async (req, res)=> {
    try {
        const {productid}=req.params
        const images= await Image.findAll({where: {productId:productid}})
        res.status(200).send(images)
    }
    catch(error) {
        res.status(500).send(error)
    }
}

 const updateImage = async(req,res)=>{
    const { id } = req.params
    const { Url } = req.body
  
    try {
      const updated = await Image.update(
        { Url},
        { where: { id } }
      )
        res.status(200).send(updated);
     
    } 
    catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
}

 const deleteImage = async(req,res)=>{
    try{
       const  id=req.params.id
        const image = await Image.destroy({where : { id:id}})
        res.status(200).send(" product deleted successfully")
    }
    catch(err){
        res.status(404).send(err)
    }
} 

module.exports = {
    addImage,
    getImages,
    updateImage,
    deleteImage
}