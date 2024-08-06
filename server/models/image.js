module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        Url: {
            type: DataTypes.STRING,
            allowNull: false
        }
       
    })
    return Image
}