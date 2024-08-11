
const {Image} = require ("../indexdatabase.js")
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addImage = async (req, res)=>{
   
    try {
        const picture = req.body.Url;
        const uploaded = await cloudinary.uploader.upload(picture, {})
        console.log(uploaded)
        const imagesaved = await Image.create({
            Url: uploaded.secure_url,
            productId: req.body.productId
        })
        res.status(200).send({
            message: "Image added successfully",
            image: imagesaved
        });
    } catch (err) {
        console.error("Error during image upload:", err)
        res.status(500).send({ error: "Image upload failed", details: err.message })
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


const updateImage = async (req, res) => {
    const { id } = req.params;
    const { Url } = req.body;
  
    try {
       
      const result = await cloudinary.uploader.upload(Url, {
        folder: 'images', // Optional: specify the folder in Cloudinary
      });
  
       
      const updated = await Image.update(
        { Url: result.secure_url },
        { where: { id } }
      );
  
      res.status(200).send(updated);


    


    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to update image' });
    }
  };










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