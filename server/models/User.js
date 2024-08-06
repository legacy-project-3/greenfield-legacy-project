module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        
        },
        address: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:"Palestine"
        },
        firstName: {
            type:DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "last name"
        },
        status: {
            type: DataTypes.STRING,
            defaultValue:'active'
        }
    })
    return User
}