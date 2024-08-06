module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,3),
            allowNull: false
        },
        rating : {
            type: DataTypes.DECIMAL(2,1),

            allowNull: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type:DataTypes.INTEGER,
            allowNull:false

        }
        
    })
    return Product
}