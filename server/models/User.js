module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("buyer", "seller","admin"),
            allowNull: false,
            defaultValue: "buyer"
            
            
        },
        address: {
            type: DataTypes.STRING,
            allowNull:true
        },
        firstName: {
            type:DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return User
}