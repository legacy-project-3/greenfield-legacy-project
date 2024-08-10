const {Product, Image , Category}=require('../indexdatabase.js')

module.exports ={
    getAllProduct : async(req,res)=>{
        try{
            const product=await Product.findAll()
            res.status(200).send(product)
        }
        catch(err){
            res.status(404).send(err)
        }
    },
    addProduct : async(req,res)=>{
      console.log("userId",req.body.userId)
      console.log(req.body)
        try{
            const product = await Product.create(req.body)
            res.status(200).send(product)
        }
        catch(err){
            throw err 
        }
    },
    deleteProduct : async(req,res)=>{
        try{
           const  id=req.params.id
            const product=await Product.destroy({where : { id:id}})
            res.status(200).send("deleted YOYOYO!")
        }
        catch(err){
            res.status(404).send(err)
        }
    } ,
    updateProduct : async(req,res)=>{
        const { id } = req.params
        const { quantity, price} = req.body
      
        try {
          const updated = await Product.update(
            { price , quantity},
            { where: { id } }
          )
            res.status(200).send(updated);
         
        } 
        catch (error) {
          console.error(error);
          res.status(404).send(error);
        }
    },
   getOneProduct : async(req,res)=>{
    try{
      const {id}=req.params
      gete=await Product.findByPk(id)
      res.status(200).send(gete)
    }
    catch(err){
        res.status(404).send(err)
    }
   },


   getProdAndImage : async (req, res) => {
    const userid = req.params.userId;

    try {
        // Assuming Product is your Sequelize model
        const products = await Product.findAll({ where: { userId: userid },include:[{model:Image},{model:Category}]});

        

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this user' });
        }

        res.status(200).send( products );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products for user' });   
    
}
   },

   getAllProdAndImages : async (req, res) => {
    

    try {
       
        const products = await Product.findAll({include:[{model:Image},{model:Category}]});
        

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).send( products );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products' });   
    
}
   },
   
getAllProductByCategories : async(req,res)=>{
    try{
        const product=await Product.findAll({where :{categoryId:req.params.id}})
        res.status(200).send(product)
    }
    catch(err){
        res.status(404).send(err)

    }
}}

