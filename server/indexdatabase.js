const { Sequelize, DataTypes} = require("sequelize")
const config = require("../server/config/config.json")

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: "localhost",
    dialect: "mysql",
})

const Product = require("./models/products.js")(sequelize, DataTypes)
const Category = require ("./models/categories.js")(sequelize, DataTypes)
const Cart = require ("./models/cart.js")(sequelize, DataTypes)
const Whishlist = require ("./models/whishlist.js") (sequelize, DataTypes)
const User = require ("./models/User.js") (sequelize, DataTypes)
const Image = require ("./models/image.js")(sequelize, DataTypes)



User.hasMany(Product, {foreignKey: "userId"})
Product.belongsTo(User, {foreignKey: "userId"})
Category.hasMany(Product, {foreignKey: "categoryId"})
Product.belongsTo(Category, {foreignKey: "categoryId"})
User.hasMany(Cart, {foreignKey: "userId"})
Cart.belongsTo(User, {foreignKey: "userId"})
Product.hasMany(Cart, {foreignKey: "productId"})
Cart.belongsTo(Product, {foreignKey: "productId"})
User.hasMany(Whishlist, {foreignKey: "userId"})
Whishlist.belongsTo(User, {foreignKey: "userId"})
Product.hasMany(Whishlist, {foreignKey: "productId"})
Whishlist.belongsTo(Product, {foreignKey: "productId"})
Product.hasMany(Image, {foreignKey: "productId"})
Image.belongsTo(Product, {foreignKey: "productId"})

sequelize
.authenticate()
.then(()=> console.log(" Connection has been established successfully"))
.catch((error)=>console.log("unable to connect to the database", error))

sequelize
.sync()
.then(()=>{console.log("database and tables created successfully")})
.catch((error)=>{console.log(error, "error sync")})


module.exports = {
    Sequelize,
    sequelize,
    User,
    Product,
    Image,
    Whishlist,
    Cart,
    Category
}